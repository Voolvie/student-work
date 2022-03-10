//Wypozyczone ksiazki
import React, { useContext, useEffect, useState } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db} from "../../firebase";
import { collection, getDocs } from "firebase/firestore"
import { useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FineModal from "../Modals/AddressModal";
import moment from "moment";
import emailjs from "emailjs-com"
import NavbarBooks from "../Navbar/NavbarBooks";
import SearchBarUsers from "../Navbar/SearchBarUsers";
import { FilterContext } from "../../context/FilterContext";
import { CategoryContext } from "../../context/CategoryContext";

const RentedBooks = () => {

    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [books, setBooks] = useState([])
    const overDated = []
    const [overDued, setOverDued] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [filter, setFilter]  = useContext(CategoryContext)


    const today = new Date()
    const todayDate = moment(today).format('DD MMM, YYYY')

    useEffect(() => {
            let booksCollectionRef = {}  
             if (filter === "") {
                 booksCollectionRef = db.collection('rented-books')
             } else {
                 booksCollectionRef = db.collection('rented-books').where("userEmail", "==", filter)
             }
             
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
    },[overDued, isDeleted, filter])

    const testClick = () => {
        setOverDued(!overDued)
    }

     const deleteRentedBook = ({userEmail, title, startDate, image, endDate, bookID, author, address}) => {

            db.collection('rented-books').doc(userEmail + ' ' + title).delete()
            db.collection('users-books').doc(userEmail + ' ' + title).delete()

            db.collection('deleted').doc(userEmail + ' ' + title).set({
            deleteDate: todayDate,
            address,
            image,
            title,
            userEmail,
            startDate,
            bookID,
            endDate,
            author
        }).then(() => {
            alert('Usunięto książkę')
            setIsDeleted(!isDeleted)
        })
    }
     const sendNotification = ({userEmail, title}) => {
        let toSend = ({title: title, userEmail: 'klemczak.szymon@gmail.com'})
        console.log(toSend.title, toSend.userEmail)
        emailjs.send('service_ib3fa88', 'template_usjknsr', toSend, 'dW8jWwzW9an1yK1it')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
     }
    return (
        <div className="dashboard-content2">
            <div className="rentedSearch">

            {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22" ? <NavbarAdmin /> : <Redirect to="/" />}
            {overDued ? 
            <button onClick={testClick}>Pokaż wszystko</button>
             :
            <button onClick={testClick}>Pokaż przeterminowane</button>
             }
            <div className="bookFunctions">
                <SearchBarUsers data={books}/>
            </div>
             </div>
            
            <div className="rentedBooks">
                {books.map((book) => {
                    const dni = moment(book.endDate).diff(todayDate, 'days')
                    const fine = (dni*-1)*0.1
                    return (
                        <div key={book.id} className="my-books">
                            <div><img width="140" height="150" src={book.image} alt={book.title} /></div>
                            <div>
                                <h4>{book.title}</h4>
                                <h5>{book.userEmail}</h5>
                                <p>Data wypożyczenia: {book.startDate}</p>
                                <p>Data oddania: {book.endDate}</p>
                                {/* <FineModal book={book}/> */}
                                {dni < 0 && <p>Kara: {((dni*-1)*0.10).toFixed(2)} zł</p>}
                                <button onClick={() => deleteRentedBook(book)}>Usuń wypożyczenie</button>
                                <button onClick={() => sendNotification(book, fine)}>Wyślij powiadomienie</button>
                            </div>
                        </div>
                    )
                })}
            </div>    
            
        </div>
    )
}

export default RentedBooks