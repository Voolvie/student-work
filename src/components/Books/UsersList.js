import React , {useState, useEffect, useContext} from "react";
import {  db} from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../style.css"
import NavbarAdmin from "../Navbar/NavbarAdmin";
import SearchBarUsers from "../Navbar/SearchBarUsers";
import { CategoryContext } from "../../context/CategoryContext";


const UsersList = () => {
    const [users, setUsers] = useState([])
    const [isDelete, setIsDelete] = useState(false) 
    const [filter, setFilter]  = useContext(CategoryContext) 


    useEffect(() => {
            let booksCollectionRef = {}  
             if (filter === "") {
                 booksCollectionRef = db.collection('users').where("isAdmin", "==", false)
             } else {
                 booksCollectionRef = db.collection('users').where("displayName", "==", filter)
             }
            const getUsers = async () => {
            const data = await getDocs(booksCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getUsers()

    }, [filter, isDelete])

    const handleDelete = ({uid}) => {
        db.collection('users').doc(uid).delete()
        alert('Usunięto pracownika')
        setIsDelete(!isDelete)
    }

    return (
       <div>
        <NavbarAdmin/>
            <div className="booksLayout">
                <div className="searchDiv">
            <div className="bookFunctions">
                <h5>Wyszukaj użytkownika</h5>
                <SearchBarUsers data={users}/>
            </div>
             </div>
                <div className="rentedLayout">
                {
                users.map((user) => {
                    return (               
                        <div key={user.id} className="users">
                            <div>
                                <h4>{user.displayName}</h4>
                                <p>{user.email}</p>
                                <p>{user.phoneNumber}</p>
                                <button onClick={() => handleDelete(user)}>Usuń</button>
                            </div>
                        </div>
                    )
                })}
                 </div>

            </div>
        </div>
    )
}

export default UsersList