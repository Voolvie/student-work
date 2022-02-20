import React, {useState, useContext} from "react";
import { Button, Container, FormControl, Nav, Navbar, NavDropdown, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CategoryContext } from "../../context/CategoryContext";

const NavbarUser = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [category, setCategory] = useContext(CategoryContext)


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
                            <NavDropdown  title="Kategorie" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={() => setCategory("")}>Wszystko</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item  onClick={() => setCategory("Biografia")}>Biografia</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Historia")}>Historia</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Literatura młodzieżowa")}>Literatura młodzieżowa</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Powieść")}>Powieść</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Dla dzieci")}>Dla dzieci</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Horror")}>Horror</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Literatura obyczajowa")}>Literatura obyczajowa</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Romans")}>Romans</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Filozofia")}>Filozofia</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Lektury")}>Lektury</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Literatura piękna")}>Literatura piękna</NavDropdown.Item>
                                <NavDropdown.Item  onClick={() => setCategory("Sensacja Thriller")}>Sensacja Thriller</NavDropdown.Item> 
                            </NavDropdown>
                            <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/update-profile">Update profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/update-profile">Update profile</NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="link" onClick={handleLogout}>Log out</Button>
                        </Nav>

                        <Nav.Link href="/cart">Koszyk</Nav.Link>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}  

export default NavbarUser