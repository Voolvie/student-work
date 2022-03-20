import React, { useEffect, useState } from "react";
import Modal from "react-modal"
import { Form, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useHistory, Link, Redirect } from "react-router-dom";

Modal.setAppElement('#root')

 const ReviewModal = ({book}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        setAuthor(currentUser.displayName)
    }, [])

    const customStyles = {
        content: {
            width: '50%',
            textAlign: 'center',
            backgroundColor: '#C07100',
            color: 'white',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }
    function handleSubmit (e) {
        e.preventDefault()

        if( author === "" || description === "" ) {
            alert('Uzupełnij wszystko')
        } else {
                setLoading(true)
                setError('')
                db.collection('books').doc(book.title).update({
                review: arrayUnion(`${author}: ${description}`)
                
            }).then(()=> {
                setDescription('')
                alert('Dodano książkę!')
            }).catch((e) => {
                setError('Error', error)
            }).finally(() => {
                setLoading(false)
                history.push('/')
            })

        }
    }
    return (
        <div>
            <button className="cartButton"
            onClick={() => setModalIsOpen(true)}
            >Dodaj recenzję</button>
            <Modal
             isOpen={modalIsOpen}
             style={customStyles}
            >   
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="reviewText">
                        <Form.Label>Recenzja</Form.Label>
                        <Form.Control type="text" onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-20" type="submit">Dodaj</Button>
                </Form>
                
                <button onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default ReviewModal