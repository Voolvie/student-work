import React from "react";
import { useAuth } from "../context/AuthContext";
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin" 
import Books from "./Books/Books";
import './style.css'



export const Dashboard = (data) => {
    const {currentUser} = useAuth()

    return (

        <div >
            {currentUser.uid === process.env.REACT_APP_ADMIN_ID || currentUser.uid ==="UdSsTduvNONQj4qVarYEuhSQeyJ3" ? <NavbarAdmin /> : <NavbarUser/>}
            <Books />
        </div>

        
    )
}