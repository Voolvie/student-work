import React from "react";
import { Button, Container, FormControl, Nav, Navbar, Form } from "react-bootstrap"

const NavbarMain = () => {
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
                            <Nav.Link style={{color:"white"}} href="/login">Login</Nav.Link>
                        </Nav>
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

export default NavbarMain