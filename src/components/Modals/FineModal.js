import React, { useState } from "react";
import "./BookModal.css"
import Modal from "react-modal"
import { Button, Form } from "react-bootstrap";
import { db } from "../../firebase";

Modal.setAppElement('#root')

 const FineModal = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [fine, setFine] = useState(0)
    const customStyles = {
        content: {
            width: '50%',
            textAlign: 'center',
            backgroundColor: '#46344E',
            color: 'white',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

   const handleSubmit = (e) => {
       e.preventDefault()

       db.collection('fines').doc(props.book.userEmail + ' ' + props.book.title).set({
           image: props.book.image,
           title: props.book.title,
           fine: fine,
           userEmail: props.book.userEmail
       }).then(() => {
           alert('Pomyślnie nałożono karę')
           setModalIsOpen(false)
       })
       
   }

    return (
        <div>
            <button
            onClick={() => setModalIsOpen(true)}
            >Nałóż karę</button>
            <Modal
             isOpen={modalIsOpen}
             style={customStyles}
            >   
                <img width="140" height="150" src={props.book.image} alt={props.book.title} />
                <h1>Tytuł: {props.book.title}</h1>
                <h3>Użytkownik: {props.book.userEmail}</h3>
                <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                         <Form.Label>Kwota: </Form.Label>
                        <Form.Control type="number"  onChange={(e) => setFine(e.target.value)} required />
                        </Form.Group>
                    <Button type="submit">Nałóż karę</Button>
                </Form>
                <button onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default FineModal