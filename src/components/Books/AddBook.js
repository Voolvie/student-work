import React, { useEffect, useState } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { Card, Container, Form, Button } from "react-bootstrap";
import app, { db, storage } from "../../firebase";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AddBook = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publish, setPublish] = useState('')
    const [category, setCategory] = useState('')
    const [language, setLanguage] = useState('')
    const [bookID, setBookID] = useState('')
    const [fileUrl, setFileUrl] = useState(null) 

    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
        }

    // useEffect(() => {
    //     if(!file){
    //         return
    //     }
    //     const fileReader = new FileReader()
    //     fileReader.onload = () => {
    //         setpreviewUrl(fileReader.result)
    //     }
    //     fileReader.readAsDataURL(file)
    // }, [file])

     function handleSubmit (e) {
        e.preventDefault()

        if(title === "" || author === "" || publish === "" || category === "" || language === "" || bookID === "" || fileUrl === null) {
            alert('Uzupełnij wszystko')
        } else {
                setLoading(true)
                setError('')
                db.collection('books').doc(title).set({
                title: title,
                author: author,
                publish: publish,
                category: category,
                language: language,
                bookID: bookID,
                image: fileUrl
            }).then(()=> {
                setTitle('')
                setAuthor('')
                setPublish('')
                setCategory('')
                setLanguage('')
                setBookID('')
                alert('Dodano książkę!')
            }).catch((e) => {
                setError('Error', error)
            }).finally(() => {
                setLoading(false)
                history.push('/')
            })

        }
         
    }
    

    return (
        <div className="dashboard-content">
            {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22" ? <NavbarAdmin /> : <Redirect to="/" />}

            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{ maxWidth: "400px"}}>
                <Card>
                    <Card.Header as="h3" className="text-center mb-4">Dodaj książkę</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tytuł</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setTitle(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setAuthor(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Wydawnictwo</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setPublish(e.target.value)}  required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kategoria</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setCategory(e.target.value)}  required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Język</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setLanguage(e.target.value)}  required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>ID książki</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setBookID(e.target.value)}  required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Zdjecie ksiazki</Form.Label>
                                <Form.Control type="file"  onChange={onFileChange} />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 " type="submit">Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            </Container>
        </div>
    )
}

export default AddBook