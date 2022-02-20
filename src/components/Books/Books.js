import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import { useAuth } from "../../context/AuthContext";
import { CategoryContext} from "../../context/CategoryContext";
import BookModal from "../Modals/BookModal";
import NavbarBooks from "../Navbar/NavbarBooks";


const Books = (props) => {
    const [books, setBooks] = useState([])
    const { currentUser } = useAuth()
    const [category, setCategory]  = useContext(CategoryContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [available, setAvailable] = useState(true)
    
    

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

        if (currentUser === null) {
             setIsAdmin(false)
        } else if (currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22") {
            setIsAdmin(true)
        }
        
    }, [category, available])

    const addToCart = ({title, author, bookID, image}) => {
        if (currentUser != null) {
            db.collection('cart').doc(currentUser.email + ' ' + title).set({
                image: image,
                title: title,
                author: author,
                bookID: bookID,
                userID: currentUser.uid,
                userEmail: currentUser.email
            })
        } else {
            alert('MUSISZ BYĆ ZALOGOWANY')
        }
        
    }

    const changeState = ({available, title}) => {
        if (available === true)
        {
            db.collection('books').doc(title).update({
            available: false
             })
             setAvailable('Niedostępna')
        } else {
           db.collection('books').doc(title).update({
            available: true
             })
             setAvailable('Dostępna') 
        }
        
    }


    return (
    <div>
        <div className="kategoria">
            <h5>Kategoria: {category ? category : "Wszystko"}</h5>
            <NavbarBooks />
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
                            {isAdmin ? 
                                <div>
                                    {book.available ?
                                    <button onClick={(e) => changeState(book, e)}>Oznacz jako niedostępna</button>
                                    :
                                    <button onClick={(e) => changeState(book, e)}>Oznacz jako dostępna</button>
                                    } 
                                </div> : 
                                <div>
                                    {book.available ?
                                    <button onClick={(e) => addToCart(book, e)}>Dodaj do koszyka</button>
                                    :
                                    <p>Książka jest niedostępna</p>
                                    } 
                                </div>
                            }
                            
                            <BookModal book={book} />
                        </div>
                    </div>
                    
                )
            })}
        </div>
    </div>
    )
}
export default Books