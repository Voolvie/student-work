import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin";



const UpdateProfileWorker = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

        function handleSubmit (e) {
        e.preventDefault()


        if(password !== passwordConfirm) {
            return setError('Password do not match')
        }
        
        const promises = []
        setLoading(true)
        setError('')
        if(email !== currentUser.email) {
            promises.push(updateEmail(email))
        }
        if(password !== currentUser.password) {
            promises.push(updatePassword(password))
        }
        if(displayName !== currentUser.displayName){
            currentUser.updateProfile({
                displayName: displayName
            })
            db.collection("users").doc(currentUser.uid).update({
                displayName: displayName
            })
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update')
        }).finally(() => {
            setLoading(false)
        })
    }
    
    return (
        <div >

        <NavbarAdmin />
        <div className="profilie-content">
            <div className="singleBook-left"></div>
            <div className="myBooks-main">
            <Container className="d-flex align-items-center justify-content-center" >
                <div className="w-100" style={{ maxWidth: "400px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Aktualizuj profil</h2>
                            {error && <Alert variant="danger">{error} </Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="name">
                                    <Form.Label>Nazwa użytkownika</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setDisplayName(e.target.value)} defaultValue={currentUser.displayName}/>
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} defaultValue={currentUser.email} />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Hasło</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Potwierdź hasło</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 " type="submit">Aktualizuj</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Link to='/'> Cofnij</Link>
                    </div>
                    </div>
                </Container>
            </div>
            <div className="singleBook-right"></div>
        </div>
        </div>
    )
}
export default UpdateProfileWorker