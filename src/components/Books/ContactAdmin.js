import React , {useState, useEffect} from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import { arrayUnion } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ContactAdmin = () => {
    const [contacts, setContacts] = useState([])
    const [newContactTopic, setNewContactTopic] = useState('')
    const [newContactDescription, setNewContactDescription] = useState('')
    const {currentUser} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [sent, setSent] = useState(false)

    useEffect(() => {
            const booksCollectionRef = db.collection('contact')
            const getContacts = async () => {
            const data = await getDocs(booksCollectionRef)
            setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getContacts()
    }, [sent])

    const handleDelete = ({displayName}) => {
                const deleteFromRequest = async () => {
            db.collection('contact').doc(displayName).delete()
        }
        deleteFromRequest()
        setSent(!sent)
    }

    return (
        <div className="dashboard-content">
            <NavbarAdmin />
            {contacts.map((contact) => {
                return <div key={contact.id} className="text-white">
                    <h4>{contact.topic} {contact.displayName}</h4>
                    <a className="btn btn-primary" href={"/contacts/"+contact.displayName} target="_blank">Odpisz</a>
                    <button onClick={() => handleDelete(contact)}>Usuń wątek</button>
                </div>
            })}
        </div>
    )
}

export default ContactAdmin