import React , {useState, useEffect} from "react";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import AddressModal from "../Modals/AddressModal";
import NavbarAdmin from "../Navbar/NavbarAdmin";


const Returns = () => {
    const [myBooks, setMyBooks] = useState([])

    useEffect(() => {
            const booksCollectionRef = db.collection('return')
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()

    }, [])

    return (
        <div >
            <NavbarAdmin/>
                <div className="requestsLayout">
                {
                myBooks.map((book) => {
                    if (book.fine < 0 ) {
                        return book.fine = 0
                    }
                    return (
                        
                        <div key={book.id} className="request">
                            <div>
                                <img width="140" height="150" src={book.image} alt={book.title} />
                            </div>
                            <div>
                                <h3>{book.title}</h3>
                                <h4>{book.userEmail}</h4>
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