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
        // <div>
        //     <Navbar className="navbar">
        //         <Container >
        //             <Navbar.Brand href="#">LIBRARY APP</Navbar.Brand>
        //             <Navbar.Toggle aria-controls="navbarScroll" />
        //             <Navbar.Collapse id="navbarScroll">
        //                 <Nav
        //                 className="me-auto my-2 my-lg-0"
        //                 style={{ maxHeight: '100px' }}
        //                 navbarScroll
        //                 >
        //                     <Nav.Link style={{color:"white"}} href="/">Books</Nav.Link>
        //                     <Nav.Link style={{color:"white"}} href="/add-book">AddBook</Nav.Link>
        //                     <Nav.Link style={{color:"white"}} href="/requests">Requests</Nav.Link>
        //                     <Nav.Link style={{color:"white"}} href="/rented-books">Rented Books</Nav.Link>
        //                     <Nav.Link style={{color:"white"}} href="/contact-admin">Pomoc</Nav.Link>
        //                     <Nav.Link style={{color:"white"}} href="/returns">Zwroty</Nav.Link>
        //                     <Nav.Link style={{color:"white"}} href="/deleted">Usunięte</Nav.Link>
        //                     <NavDropdown title="Profile" id="navbarScrollingDropdown">
        //                         <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
        //                         <NavDropdown.Item href="/update-profile">Update profile</NavDropdown.Item>
        //                         <NavDropdown.Divider />
        //                         <NavDropdown.Item href="/update-profile">Update profile</NavDropdown.Item>
        //                     </NavDropdown>
        //                     <Button variant="link" onClick={handleLogout}>Log out</Button>
        //                 </Nav>
        //             </Navbar.Collapse>
        //         </Container>
        //     </Navbar>
        // </div>
    )
}  

export default NavbarAdmin