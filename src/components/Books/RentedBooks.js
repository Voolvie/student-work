import React, { useContext, useEffect, useState } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db} from "../../firebase";
import {  getDocs } from "firebase/firestore"
import { useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import moment from "moment";
import emailjs from "emailjs-com"

import SearchBarRented from "../Navbar/SearchBarRented";

import { CategoryContext } from "../../context/CategoryContext";

const RentedBooks = () => {

    const { currentUser } = useAuth()
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
            alert('Usuni??to ksi????k??')
            setIsDeleted(!isDeleted)
        })
    }
     const sendNotification = ({userEmail, title}) => {
        let toSend = ({title: title, userEmail: userEmail})
        console.log(toSend.title, toSend.userEmail)
        emailjs.send('service_ib3fa88', 'template_usjknsr', toSend, 'dW8jWwzW9an1yK1it')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
     }
    return (
        <div>
            {currentUser.uid === process.env.REACT_APP_ADMIN_ID ? <NavbarAdmin /> : <Redirect to="/" />}
        <div className="rentedLayout">
            <div className="searchDiv">
            {overDued ?
            <div className="overdueBtn"><button className="overdueBtnStyle" onClick={testClick}>Poka?? wszystko</button></div> 
             :
            <div className="overdueBtn"><button className="overdueBtnStyle" onClick={testClick}>Poka?? przeterminowane</button></div>
             }
            <div className="bookFunctions">
                <h5>Wyszukaj u??ytkownika</h5>
                <SearchBarRented data={books}/>
            </div>
             </div>
            
            <div className="renteds">
                {books.map((book) => {
                    const dni = moment(book.endDate).diff(todayDate, 'days')
                    const fine = (dni*-1)*0.1
                    return (
                        <div key={book.id} className="rentedBook">
                            <div><img  src={book.image} alt={book.title} /></div>
                            <div>
                                <h4>{book.title}</h4>
                                <h5>{book.userEmail}</h5>
                                <p>Wypo??yczenie: {book.startDate}</p>
                                <p>Data oddania: {book.endDate}</p>
                                {dni < 0 && <p>Kara: {((dni*-1)*0.10).toFixed(2)} z??</p>}
                                <button className="optionBtn" onClick={() => deleteRentedBook(book)}>Usu?? wypo??yczenie</button>
                                <button className="optionBtn" onClick={() => sendNotification(book, fine)}>Wy??lij powiadomienie</button>
                            </div>
                        </div>
                    )
                })}
            </div>    
            </div>
        </div>
    )
}

export default RentedBooks