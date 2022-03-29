import React, { useState } from "react";
import Modal from "react-modal"

Modal.setAppElement('#root')

 const AddressModal = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const customStyles = {
        content: {
            width: '50%',
            textAlign: 'center',
            backgroundColor: '#C07100',
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
            <button className="optionBtn"
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
                <button  onClick={() => setModalIsOpen(false)}> Zamknij </button>
            </Modal>
        </div>
    )
}

export default AddressModal