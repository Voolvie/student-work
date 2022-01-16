import React , {useState, useEffect} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";


const MyBooks = () => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
            const booksCollectionRef = db.collection('users-books').where("userEmail", "==", currentUser.email)
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()
    }, [])


    return (
        <div className="dashboard-content">
            <NavbarUser/>
            {
            myBooks.map((book, i) => {
                return (
                    <div key={book.id} className="koszyk-ksiazki">
                        <div>
                            <img width="140" height="150" src={book.image} alt={book.title} />
                        </div>
                        <div>
                            <h4>{book.title}</h4>
                            <h5>{book.userEmail}</h5>
                            <button>Oddaj</button>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default MyBooks