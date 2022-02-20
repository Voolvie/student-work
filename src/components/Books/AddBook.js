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
    const [description, setDescription] = useState('')
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

     function handleSubmit (e) {
        e.preventDefault()

        if(title === "" || author === "" || publish === "" || category === "" || language === "" || description === "" || fileUrl === null) {
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
                description: description,
                image: fileUrl
            }).then(()=> {
                setTitle('')
                setAuthor('')
                setPublish('')
                setCategory('')
                setLanguage('')
                setDescription('')
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
                                <Form.Select type="text"  onChange={(e) => setCategory(e.target.value)}  required >
                                <option value="Biografia">Biografia</option>
                                <option value="Historia">Historia</option>
                                <option value="Literatura młodzieżowa">Literatura młodzieżowa</option>
                                <option value="Powieść">Powieść</option>
                                <option value="Dla dzieci">Dla dzieci</option>
                                <option value="Horror">Horror</option>
                                <option value="Literatura obyczajowa">Literatura obyczajowa</option>
                                <option value="Romans">Romans</option>
                                <option value="Filozofia">Filozofia</option>
                                <option value="Lektury">Lektury</option>
                                <option value="Literatura piękna">Literatura piękna</option>
                                <option value="Sensacja Thriller">Sensacja Thriller</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Język</Form.Label>
                                <Form.Select type="text"  onChange={(e) => setLanguage(e.target.value)}  required >
                                <option value="Polski">Polski</option>
                                <option value="Angielski">Angielski</option>
                                <option value="Niemiecki">Niemiecki</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control type="text"  onChange={(e) => setDescription(e.target.value)}  required />
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