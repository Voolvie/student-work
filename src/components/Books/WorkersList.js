import React , {useState, useEffect, useContext} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import AddressModal from "../Modals/AddressModal";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { CategoryContext } from "../../context/CategoryContext";
import SearchBarUsers from "../Navbar/SearchBarUsers";


const WorkersList = () => {
    const [workers, setWorkers] = useState([])
    const {currentUser} = useAuth()
    const [filter, setFilter]  = useContext(CategoryContext) 

    useEffect(() => {
            let workersCollectionRef = {}  
             if (filter === "") {
                 workersCollectionRef = db.collection('workers')
             } else {
                 workersCollectionRef = db.collection('workers').where("displayName", "==", filter)
             }
            const getWorkers = async () => {
            const data = await getDocs(workersCollectionRef)
            setWorkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getWorkers()
    }, [filter])

    return (
        <div>
        <NavbarAdmin/>
            <div className="booksLayout">
                <div className="searchDiv">
            <div className="bookFunctions">
                <h5>Wyszukaj użytkownika</h5>
                <SearchBarUsers data={workers}/>
            </div>
             </div>
                <div className="rentedLayout">
                {
                workers.map((worker) => {
                    return (               
                        <div key={worker.id} className="users">
                            <div>
                                <h4>{worker.displayName}</h4>
                                <p>{worker.email}</p>
                                <p>{worker.phoneNumber}</p>
                            </div>
                        </div>
                    )
                })}
                 </div>

            </div>
        </div>
    )
}

export default WorkersList