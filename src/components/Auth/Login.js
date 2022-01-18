import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    async function handleSubmit (e) {
        e.preventDefault()
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
    

    return (
        <>
         <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{ maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {error && <Alert variant="danger">{error} </Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log in</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/forgot-password'>Forgot password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'> Sign up </Link>
            </div>
            </div>
            </Container>
        </>
    )
}