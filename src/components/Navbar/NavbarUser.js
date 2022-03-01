import React, {useState, useContext} from "react";
import { Button, Container, FormControl, Nav, Navbar, NavDropdown, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import SearchIcon from '@mui/icons-material/Search';

const NavbarUser = ({data}) => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
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
        <div>
            <Navbar className="navbar">
                <Container >
                    <Navbar.Brand href="#">LIBRARY APP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                            <Nav.Link style={{color:"white"}} href="/">Books</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/my-books">My Books</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/my-fines">My Fines</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/contact">Kontakt</Nav.Link>
                            <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/update-profile">Update profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/update-profile">Update profile</NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="link" onClick={handleLogout}>Log out</Button>
                        </Nav>
                        <Nav.Link href="/cart">Koszyk</Nav.Link>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}  

export default NavbarUser