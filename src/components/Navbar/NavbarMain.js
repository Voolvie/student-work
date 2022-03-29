import React from "react";
import "../../styles/styles.scss"

const NavbarMain = () => {
    return (
        <div className="_navbar">
            <div>
            <h1 className="navbar-title">E-Biblioteka</h1> 
            </div>
            <div className="links">
            </div>
            <div className="links-cart">
            <a href="/login">Zaloguj się</a>
            </div>  
        </div>
    )
}  

export default NavbarMain