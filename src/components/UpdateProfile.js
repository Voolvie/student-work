import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin";



const UpdateProfile = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // const [users, setUsers] = useState('')
    

    // useEffect(() => {
    //  const getUsersFromFirestore = []
    //  const subscriber = db.collection("users").onSnapshot((querySnapshot) => {
    //      querySnapshot.forEach((doc) => {
    //          getUsersFromFirestore.push({...doc.data(), key: doc.id})
             
    //      })
    //          setUsers(getUsersFromFirestore)
    //          setLoading(false)
    //  })
    //  return () => subscriber()   
    // }, [])
    // if (loading) {
    //     return <h1>loading</h1>
    // }
        
    
        // async function deleteUser() {
        //     const user = auth().currentUser
        //     user.delete().then(() => {
        //         history.push('/')
        //         console.log("user deleted")
        //     }).catch((error) => { 
        //         console.log(error)
        //     })
        // }

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
        if(phoneNumber!== currentUser.phoneNumber) {
            db.collection("users").doc(currentUser.uid).update({
                phoneNumber: phoneNumber
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
        <div className="dashboard-content">
        {/* <div>
            {users.length > 0 ? (
             users.map((user) =>
              <div key={user.key}>

                  <h1>{user.email}</h1>
                  <h2>{user.username}</h2>
                  
            </div>))
            : (
                <h1> no users</h1>
            )}
        </div>
        <div>
            {currentUser.uid}
        </div> */}
        {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22" ? <NavbarAdmin /> : <NavbarUser />}
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
         <div className="w-100" style={{ maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error} </Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => setDisplayName(e.target.value)} />
                        </Form.Group>
                         <Form.Group id="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text"  onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 " type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to='/'> Cancel</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Button >Delete user</Button>
            </div>
            </div>
        </Container>
        </div>
    )
}
export default UpdateProfile