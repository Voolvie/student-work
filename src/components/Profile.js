import React, { useState } from "react";
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import  { useAuth } from '../context/AuthContext'
import NavbarUser from "./Navbar/NavbarUser";
 


export const Profile = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

     async function handleLogout() {
        setError('')
        try {
        await logout()
        history.push("/main")
        } catch {
        setError("Failed to log out")
        }
    }

    return (
        <div >
        <NavbarUser />
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4" >Profile</h2>
                    {error && <Alert variant="danger">{error} </Alert>}
                    <div><strong>Username:</strong>{currentUser.displayName}</div>
                    <div><strong>Email:</strong>{currentUser.email}</div>
                    <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Update profile</Link>
                </Card.Body>

            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
            </div>
            </Container>
            
        </div>
    )
}

export default Profile