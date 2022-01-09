import React, { useState } from "react";
import "./BookModal.css"
import Modal from "react-modal"
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getDocs } from "firebase/firestore"
import { db } from "../../firebase";

Modal.setAppElement('#root')

 const CartModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [cart, setCart] = useState([])
    const {currentUser} = useAuth()
    const history = useHistory()

    const customStyles = {
        content: {
            width: '50%',
            textAlign: 'center',
            backgroundColor: '#E8A87C',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

        const makeRequest = () => {

        setModalIsOpen(false)

        const booksCollectionRef = db.collection('cart').where("userID", "==", currentUser.uid)

        const getCart = async () => {
        const data = await getDocs(booksCollectionRef)
        setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }
        getCart()

        cart.map(({image, userEmail, title, author, bookID}) => {
            db.collection('requests').doc(currentUser.email + ' ' + title).set({
                image: image,
                userEmail: userEmail,
                title: title,
                author: author,
                bookID: bookID
            })
        })

        booksCollectionRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete()
            })
        })

        console.log(booksCollectionRef)

        alert('Twoja prośba o wypożyczenie została przesłana!')
        history.push('/')

    }

    return (
        <div>
            <button
            onClick={() => setModalIsOpen(true)}
            >Pokaż więcej</button>
            <Modal
             isOpen={modalIsOpen}
             style={customStyles}
            >   
                 <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Imię</Form.Label>
                        <Form.Control type="text" placeholder="Imię" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control type="text" placeholder="Nazwisko" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Adres dostawy</Form.Label>
                        <Form.Control type="text" placeholder="Adres" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={makeRequest}>
                        Zatwierdź
                    </Button>
                </Form> 
                <button onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default CartModal