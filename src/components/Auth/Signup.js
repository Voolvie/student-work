import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { Link, useHistory } from "react-router-dom"


import { db }  from "../../firebase"

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setError("Passwords do not match")
    } 
    try {
      setError("")
      setLoading(true)
      const res = await signup(email, password)
      const user = res.user
      await user.updateProfile({displayName: displayName})
      .then(() => {
        db.collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: displayName,
        phoneNumber: phoneNumber,
        email,
        isAdmin: false
        })
      })
      alert('Utworzono konto')
      history.push("/")
    } catch {
      setError("Failed to create an account")
    } 
    setLoading(false)
  }

  return (
    <div className="loginLayout">
    <div className="signupContainer">
    <Container>
      <div >
      <Card className="signupCard">
        <Card.Body>
          <h2 className="text-center mb-4">Zarejestruj się</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="text">
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control type="text" onChange={(e) => setDisplayName(e.target.value)} required/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Powierdzenie hasła</Form.Label>
              <Form.Control type="password" onChange={(e) => setPasswordConfirm(e.target.value)} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Zarejestruj się
            </Button>
          </Form>
        </Card.Body>
            <div className="auth">
        Posiadasz już konto? <Link to="/login">Zaloguj się</Link>
      </div>
      </Card>
    </div>
    </Container>
    </div>
    </div>
  )
}