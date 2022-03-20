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
        <div >
            <NavbarAdmin />
            <div className="requestsLayout">
            {contacts.map((contact) => {
                return <div key={contact.id} className="request">
                    <div className="deleteContact"><button className="optionBtnDelete" onClick={() => handleDelete(contact)}>Usuń</button></div>
                    <h4>Temat: {contact.topic}</h4>
                    <h5>Użytkownik:  {contact.displayName}</h5>
                    <a className="btn btn-primary" href={"/contacts/"+contact.displayName} target="_blank">Odpisz</a>
                </div>
            })}
            </div>
        </div>
    )
}

export default ContactAdmin