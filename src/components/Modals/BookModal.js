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
            backgroundColor: '#E8A87C',
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
                <h1>{props.book.title}</h1>
                <p>{props.book.author}</p>
                <p>{props.book.category}</p>
                <p>{props.book.publish}</p>
                <p>{props.book.language}</p>
                <p>{props.book.price}</p>
                <button onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default BookModal