import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



const NavbarAdmin = () => {
    const [error, setError] = useState('')
    const { currentUser, logout} = useAuth()
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
            <div className="dropdown">
                <button className="dropBtn">Książki</button>
                <div className="dropdown-content">
                    <a href="/">Przeglądaj</a>
                    <a href="/add-book">Dodaj</a>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropBtn">Wypożyczenia</button>
                <div className="dropdown-content">
                    <a href="/requests">Prośby wypożyczenia</a>
                    <a href="/rented-books">Wypożyczone książki</a>
                    <a href="/returns">Zwroty książek</a>
                    <a href="/deleted">Usunięte</a>
                </div>
            </div>
                <a href="/contact-admin">Pomoc</a>
            <div className="dropdown">
                <button className="dropBtn">Opcje</button>
                <div className="dropdown-content">
                    {currentUser.uid !== process.env.REACT_APP_ADMIN_ID &&
                    <div>
                    <a href="/profile-worker">Mój profil</a>
                    <a href="/update-profile-worker">Aktualizuj profil</a>
                    </div>
                    }
                    {currentUser.uid === process.env.REACT_APP_ADMIN_ID &&
                    <div>
                    <a href="/add-worker">Dodaj pracownika</a>
                    <a href="/users-list">Lista użytkowników</a>
                    <a href="/workers-list">Lista pracowników</a>
                    </div>
                    }
                    
                </div>
            </div>
            </div>
            <div className="links-cart">
            <button className="logoutBtn" onClick={handleLogout}>Wyloguj się</button>
            </div>
            
        </div>
    )
}  

export default NavbarAdmin