import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import { useAuth } from "../../context/AuthContext";
import { CategoryContext} from "../../context/CategoryContext";
import BookModal from "../Modals/BookModal";
import { locale } from "moment";


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


    return (
    <div>
        <div className="kategoria">
            <h4> Kategoria: {category ? category : `Wszystko`}</h4>
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
                            {/* {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22"  ? 
                                <div>
                                    <button>edytuj</button>
                                    <button>usuń</button>
                                </div> : 
                                <div>
                                    <button>wypożycz</button>
                                </div>
                            } */}
                            <BookModal book={book} />
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