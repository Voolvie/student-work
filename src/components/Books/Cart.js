import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import { useAuth } from "../../context/AuthContext";
import { CategoryContext} from "../../context/CategoryContext";
import NavbarUser from "../Navbar/NavbarUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Cart = () => {
    const [cart, setCart] = useState([])
    const {currentUser} = useAuth()
    const history = useHistory()

    useEffect(() => {
            const booksCollectionRef = db.collection('cart').where("userID", "==", currentUser.uid)
            const getCart = async () => {
            const data = await getDocs(booksCollectionRef)
            setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getCart()
    }, [])

    const makeRequest = () => {
        const booksCollectionRef = db.collection('cart').where("userID", "==", currentUser.uid)

        const getCart = async () => {
        const data = await getDocs(booksCollectionRef)
        setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }
        getCart()

        cart.map((book) => {
            db.collection('requests').doc(currentUser.email + ' ' + book.title).set({
                image: book.image,
                userEmail: book.userEmail,
                title: book.title,
                author: book.author,
                bookID: book.bookID
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
            <NavbarUser />
            <div className="koszyk">
            {cart.map((book) => {
                return (
                    <div key={book.id} className="koszyk-ksiazki">
                        <div>
                            <img width="140" height="150" src={book.image} alt={book.title} />
                        </div>
                        <div>
                            <h4>{book.title}</h4>
                            <h5>{book.price + ' zł'}</h5>
                            {/* {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22"  ? 
                                <div>
                                    <button>edytuj</button>
                                    <button>usuń</button>
                                </div> : 
                                <div>
                                    <button>wypożycz</button>
                                </div>
                            } */}
                        </div>
                    </div>
                    
                )
            })}
            </div>
            <div className="wypozycz">
                <button onClick={makeRequest}>Wypożycz</button>
            </div>
        </div>
    )
}

export default Cart