import React , {useState, useEffect, useRef} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import AddressModal from "../Modals/AddressModal";
import NavbarAdmin from "../Navbar/NavbarAdmin";


const Returns = () => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
            const booksCollectionRef = db.collection('return')
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()

    }, [])

    return (
        <div className="dashboard-content">
            <NavbarAdmin/>
                <div className="my-books-layout">
                {
                myBooks.map((book) => {
                    if (book.fine < 0 ) {
                        return book.fine = 0
                    }
                    return (
                        
                        <div key={book.id} className="my-books">
                            <div>
                                <img width="140" height="150" src={book.image} alt={book.title} />
                            </div>
                            <div>
                                <h3>{book.title}</h3>
                                <h2>{book.userEmail}</h2>
                                <AddressModal book={book}/>
                                {book.fine > 0 && <h3>Kara: {book.fine} zł</h3>}
                            </div>
                        </div>
                    )
                })}
                 </div>

        </div>
    )
}

export default Returns