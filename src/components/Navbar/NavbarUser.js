import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/styles.scss"

const NavbarUser = ({data}) => {
    const [error, setError] = useState('')
    const {  logout } = useAuth()
    const history = useHistory()


     async function handleLogout() {
        setError('')
        try {
        await logout()
        history.push("/main")
        } catch {
        setError("Failed to log out")
        }
    }
    
    return (
        <div className="_navbar">
            <div>
            <h1 className="navbar-title">E-Biblioteka</h1> 
            </div>
            <div className="links">
            <a href="/">Książki</a>
            <a href="/my-books">Moje książki</a>
            <a href="/contact">Kontakt</a>
            <div className="dropdown">
                <button className="dropBtn">Mój profil</button>
                <div className="dropdown-content">
                    <a href="/profile">Profil</a>
                    <a href="/update-profile">Aktualizuj profil</a>
                </div>
            </div>
            </div>
            <div className="links-cart">
            <a href="/cart">Koszyk</a>
            <button className="logoutBtn" onClick={handleLogout}>Wyloguj się</button>
            </div>
            
        </div>
    )
}  

export default NavbarUser