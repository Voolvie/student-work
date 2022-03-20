import React , {useState, useEffect} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import ReviewModal from "../Modals/ReviewModal";
import "../../styles/styles.scss"


const SingleBookPage = (props) => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
            const booksCollectionRef = db.collection('books').where("bookID", "==", props.match.params.id)
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()
    }, [])

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
            <NavbarUser/>
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
                                <button className="cartButton" onClick={(e) => addToCart(book, e)}>Dodaj do koszyka</button>
                            </div>
                         </div>
                         <div className="singleBook-description">
                            <h2>Opis </h2>
                            <p>{book.description}</p>
                         </div>
                          <div className="singleBook-description">
                              <h2>Recenzje </h2>
                              {book.review ? <div>{book.review.map((review) => {
                                return <div className="singleBook-review">
                                    <p>{review}</p>
                                </div>
                            })
                            } 
                            </div> :
                            <h4>Brak recenzji</h4>  
                            }
                            
                         </div>
                          <div className="singleBook-description">
                              {currentUser !== null && <ReviewModal book={book}/>}                     
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