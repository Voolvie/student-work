import React, { useState } from "react";
import "./BookModal.css"
import Modal from "react-modal"
import { Button, Form } from "react-bootstrap";
import { db } from "../../firebase";

Modal.setAppElement('#root')

 const AddressModal = (props) => {
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


    return (
        <div>
            <button
            onClick={() => setModalIsOpen(true)}
            >Pokaż adres</button>
            <Modal
             isOpen={modalIsOpen}
             style={customStyles}
            >   
                <p>Imię: {props.book.address.name}</p>
                <p>Nazwisko: {props.book.address.surname}</p>
                <p>Telefon: {props.book.address.phoneNumber}</p>
                <p>Ulica: {props.book.address.street}</p>
                <p>Kod pocztowy: {props.book.address.postcode}, {props.book.address.city}</p>    
                <button onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default AddressModal