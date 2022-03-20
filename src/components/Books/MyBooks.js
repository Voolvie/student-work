import React , {useState, useEffect} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../../styles/styles.scss"
import moment from "moment";


const MyBooks = () => {
    const [myBooks, setMyBooks] = useState([])
    const {currentUser} = useAuth()
    const [total2, setTotal2] = useState([])
    const total = []

    const today = new Date()
    const todayDate = moment(today).format('DD MMM, YYYY')


    useEffect(() => {
            const booksCollectionRef = db.collection('users-books').where("userEmail", "==", currentUser.email)
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()

    }, [])
        
            myBooks.map((book) => {
                const dni = moment(book.endDate).diff(todayDate, 'days')
                const fine = (dni*-1)*0.1
                if(fine > 0) {
                    total.push(fine)
                }
            })
            const sum = total.reduce((partialSum, a) => partialSum + a, 0)


    const returnBook = ({image, title, userEmail, address, name, surname, phoneNumber}, fine) => {
        db.collection('return').doc(userEmail + ' ' + title).set({
           address,
           image,
           title,
           fine,
           userEmail,
           name,
           surname,
           phoneNumber
       }).then(() => {
           alert('Przesłano prośbę o oddanie')
       })
    }

    return (
        <div >
            <NavbarUser/>
                <div className="singleBook-layout">
                    <div className="singleBook-left">

                    </div>
                    <div className="myBooks-main">
                     <div className="fine">
                    <h1 className="color-white">Kara: {sum.toFixed(2)}</h1>
                     </div>
                     <div className="singleBook-main-main">
                    {
                        myBooks.map((book, i) => {
                            const dni = moment(book.endDate).diff(todayDate, 'days')
                            const fine = (dni*-1)*0.1
                            return (
                                <div key={book.id} className="myBook">
                                    <div>
                                        <img width="140" height="150" src={book.image} alt={book.title} />
                                    </div>
                                    <div>
                                        <h4>{book.title}</h4>
                                        <p>Wypożyczenie: {book.startDate}</p>
                                        <p>Termin oddania: {book.endDate}</p>
                                        {dni < 0 && <p>Kara: {((dni*-1)*0.10).toFixed(2)} zł</p>}
                                        <button onClick={() => returnBook(book, fine)}>Oddaj</button>
                                    </div>
                                </div>

                            )
                        })}
                     </div>
                    </div>
                    
                    <div className="singleBook-right">
                    </div>
                 </div>
        </div>
    )
}

export default MyBooks