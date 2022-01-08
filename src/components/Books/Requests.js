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
    }, [value])

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
                bookID: rentedBookId.bookID
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
    
    return (
        <div>
            <NavbarAdmin/>
            {
            requests.map((book, i) => {
                return (
                    <div key={book.id} className="koszyk-ksiazki">
                        <div>
                            <img width="140" height="150" src={book.image} alt={book.title} />
                        </div>
                        <div>
                            <h4>{book.title}</h4>
                            <h5>{book.userEmail}</h5>
                            <button onClick={() => rentBook(i)}>Wypożycz użytkownikowi</button>
                            <button>Nie wypożyczaj</button>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default Requests