//Wypozyczone ksiazki
import React, { useEffect, useState } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db} from "../../firebase";
import { collection, getDocs } from "firebase/firestore"
import { useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FineModal from "../Modals/FineModal";
import moment from "moment";

const RentedBooks = () => {

    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [books, setBooks] = useState([])
    const overDated = []
    const [overDued, setOverDued] = useState(false)

    const today = new Date()
    const todayDate = moment(today).format('DD MMM, YYYY')

    useEffect(() => {
            const booksCollectionRef = db.collection('rented-books')
            if (overDued == false) {
            const getBooks = async () => {
                const data = await getDocs(booksCollectionRef)
                const booksData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
                setBooks(booksData)
                }
            getBooks()
            } else {
            const getBooks = async () => {
                const data = await getDocs(booksCollectionRef)
                const booksData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
                booksData.map((book) => {
                    const dni = moment(book.endDate).diff(todayDate, 'days')
                    if (dni < 0 ) {
                        overDated.push(book)
                    }
                })
                setBooks(overDated)
                }
            getBooks()
            }
       
    }, [overDued, books])

    const testClick = () => {
        setOverDued(!overDued)
    }

     const deleteRentedBook = ({userEmail, title}) => {

            db.collection('rented-books').doc(userEmail + ' ' + title).delete()
            db.collection('fines').doc(userEmail + ' ' + title).delete()
            db.collection('users-books').doc(userEmail + ' ' + title).delete()
    }
    return (
        <div className="dashboard-content">
            {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22" ? <NavbarAdmin /> : <Redirect to="/" />}
            {overDued ? 
            <button onClick={testClick}>Pokaż wszystko</button>
             :
            <button onClick={testClick}>Pokaż przeterminowane</button>
             }
            
            <div className="my-books-layout">
                {books.map((book) => {
                    return (
                        <div key={book.id} className="my-books">
                            <div><img width="140" height="150" src={book.image} alt={book.title} /></div>
                            <div>
                                <h4>{book.title}</h4>
                                <h5>{book.userEmail}</h5>
                                <p>Data wypożyczenia: {book.startDate}</p>
                                <p>Data oddania: {book.endDate}</p>
                                <FineModal book={book}/>
                                <button onClick={() => deleteRentedBook(book)}>Usuń wypożyczenie</button>
                            </div>
                        </div>
                    )
                })}
            </div>    
            
        </div>
    )
}

export default RentedBooks