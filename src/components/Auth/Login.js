import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/styles.scss"
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore";



export const Login = () => {
    const [users, setUsers] = useState([])
    const [workers, setWorkers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const allUsers = []

    useEffect(() => {
            const usersCollectionRef = db.collection('users')
            const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getUsers()
        const workersCollectionRef = db.collection('workers')
            const getWorkers = async () => {
            const data = await getDocs(workersCollectionRef)
            setWorkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getWorkers()
            
    }, [])

    async function handleSubmit (e) {
        
        e.preventDefault()
        users.map(user => {
                allUsers.push(user.email)
            })
        workers.map(worker => {
                allUsers.push(worker.email)
            })    
        const userExist = allUsers.includes(email)
        setError("Failed to log in")    
        if (userExist === false) {
            alert('Nie ma takiego użytkownika')
        } else {
            try {
            setError("")
            setLoading(true)
            await login(email, password)
            history.push("/")
            } catch {
            setError("Failed to log in")
            }
            setLoading(false)
        }


    }
    


    return (
        <div className="loginLayout">
        <div className="loginContainer">
         <Container >
            <div >
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Zaloguj się</h2>
                    {error && <Alert variant="danger">{error} </Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Zaloguj się</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/forgot-password'>Zapomniałeś hasła?</Link>
                    </div>
                <div className="auth">
                    Potrzebujesz konta?  <Link to='/signup'> Zarejestruj się </Link>
                </div>
                </Card.Body>
            </Card>
            </div>
            </Container>
        </div>
        </div>
    )
}