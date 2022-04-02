import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import "../../styles/styles.scss"
import { useAuth } from "../../context/AuthContext";
import { CategoryContext} from "../../context/CategoryContext";
import NavbarBooks from "../Navbar/NavbarBooks";
import SearchBar from "../Navbar/SearchBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Books = (props) => {
    const [books, setBooks] = useState([])
    const { currentUser } = useAuth()
    const [workers, setWorkers] = useState([])
    const [category, setCategory]  = useContext(CategoryContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [available, setAvailable] = useState(true)
    const history = useHistory()
    const [isWorker, setIsWorker] = useState(false)
 
    const allWorkers = []

   
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

        const workersCollectionRef = db.collection('workers')
            const getWorkers = async () => {
            const data = await getDocs(workersCollectionRef)
            setWorkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            workers.map(worker => {
                allWorkers.push(worker.email)
            }) 
            }
        getWorkers()
        

        if (currentUser === null) {
             setIsAdmin(false)
        } else if (currentUser.uid === process.env.REACT_APP_ADMIN_ID) {
            setIsAdmin(true)
        } else if (currentUser !== null) {
            workers.map(worker => {
                allWorkers.push(worker.email)
            })
            setIsWorker(allWorkers.includes(currentUser.email))
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
            }).then(() => {
                alert('Dodano do koszyka!')
            })
            
        } else {
            alert('Musisz być zalogowany, aby dodać książkę do koszyka')
        }
        
    }

    const changeState = ({available, title}) => {
        if (available === true)
        {
            db.collection('books').doc(title).update({
            available: false
             })
             setAvailable(!available)
        } else {
           db.collection('books').doc(title).update({
            available: true
             })
             setAvailable(!available) 
        }
    }
            

    return (
    <div className="booksLayout">
        <div className="categoryDiv">
            <h5>Kategoria: {category ? category : "Wszystko"}</h5>
            <div className="bookFunctions">
                <SearchBar data={books}/>
            </div>
            <div>
                <NavbarBooks />
            </div>
        </div>
        <div className="books">
            {books.map((book) => {
                return (
                    <div key={book.id} className="book">
                        <div>
                            <img src={book.image} alt={book.title} />
                        </div>
                        <div>
                            <h4>{book.title}</h4>
                            <h5>{book.author}</h5>
                            <p>{book.category}</p>
                            {(isAdmin || isWorker === true) ?
                            <div> 
                                <div>
                                    {book.available ?
                                    <button className="optionBtn" onClick={(e) => changeState(book, e)}>Oznacz jako niedostępna</button>
                                    :
                                    <button className="optionBtn" onClick={(e) => changeState(book, e)}>Oznacz jako dostępna</button>
                                    } 
                                </div>
                                <div>
                                    <a className="showMoreButton" href={"/books/"+book.bookID} target="_blank">Pokaż więcej</a>
                                </div>
                            </div>
                                 : 
                                <div >
                                    {book.available ?
                                    <div className="book-buttons">
                                        <div>
                                            <button className="cartButton" onClick={(e) => addToCart(book, e)}>Dodaj do koszyka</button>
                                        </div>
                                        <div>
                                             <a className="showMoreButton" href={"/books/"+book.bookID} target="_blank">Pokaż więcej</a>
                                        </div>                         
                                    </div>
                                    :
                                    
                                    <div>
                                        <p>Książka jest niedostępna</p>
                                        <a className="showMoreButton" href={"/books/"+book.bookID} target="_blank">Pokaż więcej</a>
                                    </div>  
                                    } 
                                </div>
                                
                            }
                        </div>
                    </div>
   
                )
            })}
        </div>
    </div>
    )
}
export default Books