import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import  { useAuth } from '../context/AuthContext'
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin"
import { deleteUser } from "firebase/auth";
import { db } from "../firebase";
import { getDocs } from "firebase/firestore";


export const Profile = () => {

    const [myBooks, setMyBooks] = useState([])
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

     async function handleLogout() {
        try {
        await logout()
        history.push("/main")
        } catch {
        setError("Failed to log out")
        }
    }
    const deleteAccount = () => {
        if (myBooks.length !== 0 ) {
            alert("Aby usunąć konto musisz oddać książki!")
        } else {
        deleteUser(currentUser).then(() => {
            alert('Konto usunięte')
        }).catch((error) => {
            alert(error)
        })
        }
    }


    useEffect(() => {
            const booksCollectionRef = db.collection('users-books').where("userEmail", "==", currentUser.email)
            const getMyBooks = async () => {
            const data = await getDocs(booksCollectionRef)
            setMyBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getMyBooks()

    }, [])


    return (
    <div >
        {currentUser.uid === process.env.REACT_APP_ADMIN_ID ? <NavbarAdmin /> : <NavbarUser/>}
        <div className="profilie-content">
            <div className="singleBook-left"></div>
            <div className="myBooks-main">
            <Container className="d-flex align-items-center justify-content-center" >
            <div className="w-100" style={{ maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4" >Profil</h2>
                        {error && <Alert variant="danger">{error} </Alert>}
                        <div><strong>Nazwa użytkownika:</strong>{currentUser.displayName}</div>
                        <div><strong>Email:</strong>{currentUser.email}</div>
                        <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Aktualizuj profil</Link>
                    </Card.Body>
                    
                </Card>
                <Button onClick={(deleteAccount)}>Usuń konto</Button>
                </div>
                </Container>
            </div>
            <div className="singleBook-right"></div>
        </div>   
    </div>
    )
}

export default Profile