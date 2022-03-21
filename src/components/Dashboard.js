import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import NavbarUser from "./Navbar/NavbarUser";
import NavbarAdmin from "./Navbar/NavbarAdmin" 
import Books from "./Books/Books";
import './style.css'



export const Dashboard = (data) => {
    const {currentUser} = useAuth()

    return (

        <div >
            {currentUser.uid === "e3GEp6RMDFfyBZ9BjTfO5TyFaB22" || currentUser.uid ==="7mxeIPKsrIOEOdbakRrR7DsV6bC2" ? <NavbarAdmin /> : <NavbarUser/>}
            <Books />
        </div>

        
    )
}