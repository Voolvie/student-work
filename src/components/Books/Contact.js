import React , {useState, useEffect} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Contact = () => {
    const [contact, setContact] = useState([])
    const [newContactTopic, setNewContactTopic] = useState('')
    const [newContactDescription, setNewContactDescription] = useState('')
    const {currentUser} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [sent, setSent] = useState(false)

    useEffect(() => {
            const booksCollectionRef = db.collection('contact').where("displayName", "==", currentUser.displayName)
            const getContact = async () => {
            const data = await getDocs(booksCollectionRef)
            setContact(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getContact()
    }, [sent])

    function handleSubmit (e) {
        e.preventDefault()

        if( newContactTopic === "" || newContactDescription === "" ) {
            alert('Uzupełnij wszystko')
        } else {
                setLoading(true)
                setError('')
                db.collection('contact').doc(currentUser.displayName).set({
                displayName: currentUser.displayName,
                topic: newContactTopic,            
                review: arrayUnion(`${currentUser.displayName}: ${newContactDescription}`)
                
            }).then(()=> {
                setNewContactDescription('')
                alert('Wysłano prośbę o kontakt!')
            }).catch((e) => {
                setError('Error', error)
            }).finally(() => {
                setLoading(false)
                setSent(!sent)
                history.push('/contact')
            })

        }
    }

    function handleSubmitSent (e) {
        e.preventDefault()
        e.target.reset()

        if( newContactDescription === "" ) {
            alert('Uzupełnij wszystko')
        } else {
                setLoading(true)
                setError('')
                db.collection('contact').doc(currentUser.displayName).update({
                review: arrayUnion(`${currentUser.displayName}: ${newContactDescription}`)
                
            }).then(()=> {
                setNewContactDescription('')
            }).catch((e) => {
                setError('Error', error)
            }).finally(() => {
                setLoading(false)
                setSent(!sent)
                history.push('/contact')
            })

        }
    }


    return (
        <div className="dashboard-content">
            <NavbarUser/>
                <div className="my-books-layout">
                {contact.length !== 0 ?
                <div>
                    <h4>Temat: {contact[0].topic}</h4>
                    {contact.map((message) => {
                    return (
                        <div key={message.id} className="">
                            {message.review.map((opis) => {
                                return <p key={opis.id}>{opis}</p>
                            })}
                        </div>

                    )
                })}
                <div>
                    <Form onSubmit={handleSubmitSent}>
                    <Form.Group className="reviewText">
                        <Form.Label>Odpisz: </Form.Label>
                        <Form.Control type="text" onChange={(e) => setNewContactDescription(e.target.value)} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-20" type="submit">Wyślij</Button>
                </Form>
                </div>
                </div> 
                :
                <div>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="reviewText">
                        <Form.Label>Temat: </Form.Label>
                        <Form.Control type="text" onChange={(e) => setNewContactTopic(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="reviewText">
                        <Form.Label>Treść: </Form.Label>
                        <Form.Control type="text" onChange={(e) => setNewContactDescription(e.target.value)} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-20" type="submit">Wyślij</Button>
                </Form>
                </div>
            }
                 </div>
        </div>
    )
}

export default Contact