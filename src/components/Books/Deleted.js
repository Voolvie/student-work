import React , {useState, useEffect, useRef} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import AddressModal from "../Modals/AddressModal";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import moment from "moment";


const Deleted = () => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()
    const [isDeleted, setIsDeleted] = useState(false)

    const today = new Date()
    const todayDate = moment(today).format('DD MMM, YYYY')

    useEffect(() => {
            const booksCollectionRef = db.collection('deleted')
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()

    }, [isDeleted])

    const restoreBook = ({userEmail, title, startDate, image, endDate, bookID, author, address, phoneNumber}) => {
        db.collection('rented-books').doc(userEmail + ' ' + title).set({
            address,
            image,
            title,
            userEmail,
            startDate,
            bookID,
            endDate,
            author
        })
        db.collection('users-books').doc(userEmail + ' ' + title).set({
            address,
            image,
            title,
            userEmail,
            startDate,
            bookID,
            endDate,
            author
        })
        db.collection('deleted').doc(userEmail + ' ' + title).delete().then(()=> {
            alert('Przywrócono książkę')
            setIsDeleted(!isDeleted)
        })

    }

    const deleteBook = ({userEmail, title}) => {
        db.collection('deleted').doc(userEmail + ' ' + title).delete()
    }
        
    return (
        <div >
            <NavbarAdmin/>
                <div className="requestsLayout">
                {
                myBooks.map((book) => {
                    const dni = moment(book.deleteDate).diff(todayDate, 'days')*-1
                    if (dni > 4) {
                        deleteBook(book)
                    }
                    return (
                        
                        <div key={book.id} className="request">
                            <div>
                                <h3>Od usunięcia: {dni}</h3>
                                <img width="140" height="150" src={book.image} alt={book.title} />
                            </div>
                            <div>
                                <h3>{book.title}</h3>
                                <h2>{book.userEmail}</h2>
                                <p>Od: {book.startDate}</p>
                                <p>Do: {book.endDate}</p>
                                <AddressModal book={book}/>
                                <button className="optionBtn" onClick={() => restoreBook(book)}>Przywróć</button>
                            </div>
                        </div>
                    )
                })}
                 </div>

        </div>
    )
}

export default Deleted