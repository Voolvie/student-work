import React , {useState, useEffect} from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"


const Requests = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
            const booksCollectionRef = db.collection('requests')
            const getRequests = async () => {
            const data = await getDocs(booksCollectionRef)
            setRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getRequests()
    }, [])
    
    return (
        <div>
            <NavbarAdmin/>
            {requests.map((book) => {
                return (
                    <div key={book.id} className="koszyk-ksiazki">
                        <div>
                            <img width="140" height="150" src={book.image} alt={book.title} />
                        </div>
                        <div>
                            <h4>{book.title}</h4>
                            <h5>{book.userEmail}</h5>
                        </div>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default Requests