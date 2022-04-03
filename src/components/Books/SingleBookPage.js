import React , {useState, useEffect} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import NavbarMain from "../Navbar/NavbarMain";
import { db } from "../../firebase";
import { arrayRemove, getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import ReviewModal from "../Modals/ReviewModal";
import "../../styles/styles.scss"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavbarAdmin from "../Navbar/NavbarAdmin";

const SingleBookPage = (props) => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()
    const history = useHistory()
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
            const booksCollectionRef = db.collection('books').where("bookID", "==", props.match.params.id)
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()
    }, [isDelete])

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
    const deleteBook = ({title}) => {
        db.collection('books').doc(title).delete()
        alert(`Usunięto książkę ` + title)
        history.push('/')
    }
    const deleteReview = ({review, title}, i) => {
    db.collection('books').doc(title).update({
        review: arrayRemove(`${review[i]}`)
    })
    alert("Usunięto recenjzę")
    setIsDelete(!isDelete)
    }
    console.log(currentUser)
    return (
        <div>
            {
                currentUser === null ? <NavbarMain />
                :
                <div>
                {currentUser.uid === process.env.REACT_APP_ADMIN_ID ? <NavbarAdmin/>
                        :
                        <NavbarUser/>
                }
                </div>
            }
            
                <div className="singleBook-layout">
                    <div className="singleBook-left">

                    </div>
                    <div className="singleBook-main">
                        {
                         myBooks.map((book, i) => {
                    return (
                        <div>
                         <div key={book.id} className="singleBook">
                            <div>
                                <img width="140" height="150" src={book.image} alt={book.title} />
                            </div>
                            <div className="singleBook-info">
                                <h4>{book.title}</h4>
                                <h5>{book.author}</h5>
                                <p>{book.category}</p>
                                {book.available ? 
                                <button className="cartButton" onClick={(e) => addToCart(book, e)}>Dodaj do koszyka</button>                
                                :
                                <div>
                                    <button className="optionBtn" onClick={(e) => deleteBook(book)}>Usuń</button>
                                </div>
                                }
                                
                            </div>
                         </div>
                         <div className="singleBook-description">
                            <h2>Opis </h2>
                            <p>{book.description}</p>
                         </div>
                          <div className="singleBook-description">
                              <h2>Recenzje </h2>
                              {book.review ? <div>{book.review.map((review, i) => {
                                return <div className="singleBook-review" >
                                    <p>{review}</p>
                                    {
                                        (currentUser !== null && currentUser.uid === process.env.REACT_APP_ADMIN_ID) &&
                                        <button onClick={(e) => deleteReview(book ,i)}>Usuń</button>
                                    }
                                </div>
                            })
                            } 
                            </div> :
                            <h4>Brak recenzji</h4>  
                            }
                            
                         </div>
                          <div className="singleBook-description">
                              {(currentUser !== null && currentUser.uid !== process.env.REACT_APP_ADMIN_ID ) && <ReviewModal book={book}/>}                     
                         </div>
                        </div>
                    )
                })}
                    </div>
                    <div className="singleBook-right">
                    </div>

                 </div>
        </div>
    )
}

export default SingleBookPage