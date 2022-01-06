import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import { useAuth } from "../../context/AuthContext";
import { CategoryContext} from "../../context/CategoryContext";


const Books = (props) => {
    const [books, setBooks] = useState([])
    const { currentUser } = useAuth()
    const [category, setCategory]  = useContext(CategoryContext)
    
    

    useEffect(() => {
        if (category === "") {
            const booksCollectionRef = db.collection('books')
            const getBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getBooks()
        } else {
            const booksCollectionRef = db.collection('books').where("category", "==", category)
            const getBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getBooks()
        }
        

    }, [category])


    {/* <button onClick={(e) => showBook(book, e)}>Wypożycz</button> */}
    const addToCart = ({title, author, bookID}) => {
        db.collection('cart').doc(currentUser.email + ' ' + title).set({
                title: title,
                author: author,
                bookID: bookID,
                userID: currentUser.uid,
                userEmail: currentUser.email
            })
        console.log(currentUser.uid, currentUser.displayName, title, author, bookID)
    }


    return (
    <div>
        <div className="kategoria">
            <h2> Kategoria: {category ? category : `Wszystko`}</h2>
        </div>
            
        <div className="ksiazki">
            {books.map((book) => {
                return (
                    <div key={book.id} className="ksiazka">
                        <div>
                            <img width="140" height="150" src={book.image} alt={book.title} />
                        </div>
                        <div>
                            <h4>{book.title}</h4>
                            <h5>{book.author}</h5>
                            <p>{book.category}</p>
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
                            <button onClick={(e) => addToCart(book, e)}>Dodaj do koszyka</button>
                        </div>
                    </div>
                    
                )
            })}
        </div>
    </div>
    )
}
export default Books