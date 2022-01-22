import React , {useState, useEffect} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"


const MyFines = () => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
            const booksCollectionRef = db.collection('fines').where("userEmail", "==", currentUser.email)
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()
    }, [])


    return (
        <div className="dashboard-content">
            <NavbarUser/>
                <div className="my-books-layout">
                {
                myBooks.map((book) => {
                    return (
                        <div key={book.id} className="my-books">
                            <div>
                                <img width="140" height="150" src={book.image} alt={book.title} />
                            </div>
                            <div>
                                <h3>{book.title}</h3>
                                <h3>{book.fine} zł</h3>
                                <button>Rozlicz się</button>
                            </div>
                        </div>

                    )
                })}
                 </div>
        </div>
    )
}

export default MyFines