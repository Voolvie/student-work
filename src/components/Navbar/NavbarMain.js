import React from "react";
import { Button, Container, FormControl, Nav, Navbar, Form } from "react-bootstrap"
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
        //                     <Nav.Link style={{color:"white"}} href="/login">Login</Nav.Link>
        //                 </Nav>
        //             </Navbar.Collapse>
        //         </Container>
        //     </Navbar>
        // </div>
    )
}  

export default NavbarMain