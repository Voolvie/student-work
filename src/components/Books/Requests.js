import React , {useState, useEffect} from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"


const Requests = () => {
    const [requests, setRequests] = useState([])
    const [bookRent, setBookRent] = useState()
    const [value,setValue] = useState();


    useEffect(() => {
            const booksCollectionRef = db.collection('requests')
            const getRequests = async () => {
            const data = await getDocs(booksCollectionRef)
            setRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getRequests()
    }, [value, requests])

    const rentBook = (i) => {

        const rentedBookId = requests[i]

        const booksCollectionRef = db.collection('requests').where("bookID", "==", rentedBookId.bookID)

        
        
        const getRentedBook = async () => {
        const data = await getDocs(booksCollectionRef)
        setBookRent(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }
        getRentedBook().then(() => {
                db.collection('users-books').doc(rentedBookId.userEmail + ' ' + rentedBookId.title).set({
                image: rentedBookId.image,
                userEmail: rentedBookId.userEmail,
                title: rentedBookId.title,
                author: rentedBookId.author,
                bookID: rentedBookId.bookID,
                startDate:rentedBookId.dane.startDate,
                endDate: rentedBookId.dane.endDate,
                address: {
                    surname: rentedBookId.dane.name,
                    name: rentedBookId.dane.surname,
                    phoneNumber: rentedBookId.dane.phoneNumber,
                    city: rentedBookId.dane.city,
                    postcode: rentedBookId.dane.postcode,
                    street: rentedBookId.dane.street
                }
            })
                db.collection('rented-books').doc(rentedBookId.userEmail + ' ' + rentedBookId.title).set({
                image: rentedBookId.image,
                userEmail: rentedBookId.userEmail,
                title: rentedBookId.title,
                author: rentedBookId.author,
                bookID: rentedBookId.bookID,
                startDate:rentedBookId.dane.startDate,
                endDate: rentedBookId.dane.endDate,
                address: {
                    surname: rentedBookId.dane.name,
                    name: rentedBookId.dane.surname,
                    phoneNumber: rentedBookId.dane.phoneNumber,
                    city: rentedBookId.dane.city,
                    postcode: rentedBookId.dane.postcode,
                    street: rentedBookId.dane.street
                }
            })
        }).then(() => {
                booksCollectionRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
            alert('Wypożyczono książkę')
        }).finally(() => {
            setValue({});
        })

    }
    const dontRent = ({userEmail, title}) => {
        const deleteFromRequest = async () => {
            db.collection('requests').doc(userEmail + ' ' + title).delete()
        }
        deleteFromRequest()
    }
    return (
        <div >
            <NavbarAdmin/>
            <div className="requestsLayout">
                {requests.length > 0 ?
            requests.map((book, i) => {
                return (
                    <div key={book.id} className="request">
                        <div >
                            <h4>{book.title}</h4>
                            <h5>{book.userEmail}</h5>
                            <p>{book.dane.name} {book.dane.surname}, {book.dane.street}, {book.dane.postcode} {book.dane.city}</p>
                            <p>Start wypożycznia: {book.dane.startDate}</p>
                            <p>Koniec wypożyczenia: {book.dane.endDate}</p>
                            <p>Opłata: {((book.dane.fineAfter - 14) * 0.1) + 5} zł</p>
                            <button className="optionBtn" onClick={() => rentBook(i)}>Wypożycz użytkownikowi</button>
                            <button className="optionBtn" onClick={() => dontRent(book)}>Nie wypożyczaj</button>
                        </div>
                    </div>
                )
            })
            :
            <div>
                <h1>Brak książek do wypożyczenia</h1>
            </div>
        }
            </div>
            
        </div>
    )
}

export default Requests