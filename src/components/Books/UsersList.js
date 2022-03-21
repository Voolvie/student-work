import React , {useState, useEffect, useContext} from "react";
import NavbarUser from "../Navbar/NavbarUser";
import { isAuth, db, auth } from "../../firebase";
import { getDocs } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext";
import "../style.css"
import AddressModal from "../Modals/AddressModal";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import SearchBarUsers from "../Navbar/SearchBarUsers";
import { getAuth, deleteUser } from "firebase/compat/auth";
import { CategoryContext } from "../../context/CategoryContext";


const UsersList = () => {
    const [users, setUsers] = useState([])
    const {currentUser} = useAuth()
    const [filter, setFilter]  = useContext(CategoryContext) 


    useEffect(() => {
            let booksCollectionRef = {}  
             if (filter === "") {
                 booksCollectionRef = db.collection('users')
             } else {
                 booksCollectionRef = db.collection('users').where("displayName", "==", filter)
             }
            const getUsers = async () => {
            const data = await getDocs(booksCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getUsers()

    }, [filter])

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