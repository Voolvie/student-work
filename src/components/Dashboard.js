import React from "react";
import { useAuth } from "../context/AuthContext";
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin" 
import Books from "./Books/Books";

import './style.css'


export const Dashboard = () => {

    const {currentUser} = useAuth()
    return (
        
        <div className="navbar">
            {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22" ? <NavbarAdmin /> : <NavbarUser />}
            <Books />
        </div>
    )
}