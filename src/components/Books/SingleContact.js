import React , {useState, useEffect} from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const SingleContact = (props) => {
    const [contact, setContact] = useState([])
    const [newContactTopic, setNewContactTopic] = useState('')
    const [newContactDescription, setNewContactDescription] = useState('')
    const {currentUser} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [sent, setSent] = useState(false)

    useEffect(() => {
            const booksCollectionRef = db.collection('contact').where("displayName", "==", props.match.params.id)
            const getContact = async () => {
            const data = await getDocs(booksCollectionRef)
            setContact(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getContact()
    }, [sent])

    function handleSubmitSent (e) {
        e.preventDefault()
        e.target.reset()

        if( newContactDescription === "" ) {
            alert('Uzupełnij wszystko')
        } else {
                setLoading(true)
                setError('')
                db.collection('contact').doc(props.match.params.id).update({
                review: arrayUnion(`${currentUser.displayName}: ${newContactDescription}`)
                
            }).then(()=> {
                setNewContactDescription('')
            }).catch((e) => {
                setError('Error', error)
            }).finally(() => {
                setLoading(false)
                setSent(!sent)
                history.push(`/contacts/${props.match.params.id}`)
            })

        }
    }
    return (
        <div >
            <NavbarAdmin />
            <div className="singleBook-layout">
            <div className="singleBook-left"></div>
                <div className="singleBook-main">
                    {contact.map((message) => {
                    return (
                        <div key={message.id} className="contactMessage">
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
                <div className="singleBook-right"></div>
            </div>
        </div>
    )
}

export default SingleContact