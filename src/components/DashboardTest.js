import React from "react";
import Books from "./Books/Books";
import NavbarMain from "./Navbar/NavbarMain";
import './style.css'


export const DashboardTest = () => {

    return (
        
        <div className="dashboard-content">
            <NavbarMain />
            <Books />
        </div>
    )
}