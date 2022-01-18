import React, { useState } from "react";
import "./BookModal.css"
import Modal from "react-modal"

Modal.setAppElement('#root')

 const BookModal = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
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
            >Pokaż więcej</button>
            <Modal
             isOpen={modalIsOpen}
             style={customStyles}
            >   
                <img width="140" height="150" src={props.book.image} alt={props.book.title} />
                <h1>Tytuł: {props.book.title}</h1>
                <p>Autor: {props.book.author}</p>
                <p>Kategoria: {props.book.category}</p>
                <p>Wydawnictwo: {props.book.publish}</p>
                <p>Język: {props.book.language}</p>
                <button onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default BookModal