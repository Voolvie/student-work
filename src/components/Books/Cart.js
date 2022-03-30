import React, { useEffect, useState, useReducer } from "react";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore"
import "../../styles/styles.scss"
import { useAuth } from "../../context/AuthContext";
import NavbarUser from "../Navbar/NavbarUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Form } from "react-bootstrap";
import {DateRangeInput} from '@datepicker-react/styled'
import moment from 'moment'

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

const Cart = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const dateStart = moment(state.startDate).format('DD MMM, YYYY')
    const dateEnd = moment(state.endDate).format('DD MMM, YYYY')
    const dni = moment(dateEnd).diff(dateStart, 'days')

    const current = new Date()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [street, setStreet] = useState('')
    const [postcode, setPostcode] = useState('')
    const [city, setCity] = useState('')
    const [cart, setCart] = useState(false)
    const {currentUser} = useAuth()
    const history = useHistory()

    const [price, setPrice] = useState({
        book: 0,
        delivery: 0
    })
    const [showPrice, setShowPrice] = useState(false)

    useEffect(() => {
            const booksCollectionRef = db.collection('cart').where("userID", "==", currentUser.uid)
            const getCart = async () => {
            const data = await getDocs(booksCollectionRef)
            setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            }
        getCart()
    }, [cart])

    const deleteBook = ({userEmail, title}) => {
        const deleteFromCart = async () => {
            db.collection('cart').doc(userEmail + ' ' + title).delete()
        }
        deleteFromCart()
    }


    const calcultePrice = () => {
        
        if(dni > 14) {
            let priceCalc = dni - 14
            setPrice({
                book: cart.length * 0.10 * priceCalc,
                delivery: cart.length * 5
            })
        }


        setShowPrice(true)
    }

    const makeRequest = () => {
        if (name === "" || surname === "" || phoneNumber === "" || street === "" || postcode === "" || city === "" || dateStart === "" || dateEnd === "" ) {
            alert('Uzupełnij wszystko!')
        } else {
            const booksCollectionRef = db.collection('cart').where("userID", "==", currentUser.uid)
        const getCart = async () => {
        const data = await getDocs(booksCollectionRef)
        setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }
        getCart()

        cart.map(({image, userEmail, title, author, bookID}) => {
            db.collection('requests').doc(currentUser.email + ' ' + title).set({
                image: image,
                userEmail: userEmail,
                title: title,
                author: author,
                bookID: bookID,
                dane: {
                    name: name,
                    surname: surname,
                    phoneNumber: phoneNumber,
                    street: street,
                    postcode: postcode,
                    city: city,
                    startDate: dateStart,
                    endDate: dateEnd,
                    fineAfter: dni
                }
            })
        })
        booksCollectionRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete()
            })
        })
        alert('Twoja prośba o wypożyczenie została przesłana!')
        history.push('/')
        }     
    }

    return (
        <div>
            <NavbarUser />
            <div >
                {cart == false ? 
                <div className="cartEmpty">
                    <h1>Koszyk jest pusty</h1>
                </div> :
                <div className="cart">
                    <div className="booksCart">
                    {cart.map((book) => {
                    return (
                        <div key={book.id} className="book">
                            <div>
                                <img width="140" height="150" src={book.image} alt={book.title} />
                            </div>
                            <div>
                                <h4>{book.title}</h4>
                            </div>
                            <div className="deleteButtonStyles">
                            <button className="deleteButton" onClick={() => deleteBook(book)}>
                                Usuń
                            </button>
                            </div>
                            
                        </div>
                        )
                    })}
                    </div>
                    <div className="rent-main">

                    <div className="rent">
                        <div className="rent1">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Imie</Form.Label>
                            <Form.Control type="text" placeholder="Imie" onChange={(e) => setName(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control type="text" placeholder="Nazwisko" onChange={(e) => setSurname(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control type="tel" pattern="[0-9]{9}" placeholder="Telefon" onChange={(e) => setPhoneNumber(e.target.value)} required/>
                        </Form.Group>
                        </div>
                        <div className="rent2">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Ulica i nr domu</Form.Label>
                            <Form.Control type="text" placeholder="Ulica" onChange={(e) => setStreet(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Kod pocztowy</Form.Label>
                            <Form.Control type="text" placeholder="Kod pocztowy" onChange={(e) => setPostcode(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Miasto</Form.Label>
                            <Form.Select type="text"  onChange={(e) => setCity(e.target.value)} required>
                                <option value="Gliwice">Gliwice</option>
                                <option value="Zabrze">Zabrze</option>
                                <option value="Bytom">Bytom</option>
                            </Form.Select>
                        </Form.Group>
                        </div>
                        <div className="rent3">
                        {cart.length > 3 ? <div><h3>Możesz wypożyczyć maksymalnie 3 książki</h3></div> :
                        <Form>
                            <h2>Wybierz termin</h2>
                        <DateRangeInput
                        minBookingDate = {current}
                        onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
                        onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
                        startDate={state.startDate} 
                        endDate={state.endDate} 
                        focusedInput={state.focusedInput} 
                        />
                        <Button onClick={calcultePrice}>Oblicz cenę</Button>
                        {showPrice ?
                        <div>
                        <h3>Cena za wypożyczenie to {price.book} zł</h3>
                        <h3>Cena za dostawę to {price.delivery} zł</h3>
                        <h3>Łącznie do zapłaty {(price.book + price.delivery)} zł</h3>
                        <p>Płatność kartą lub gotówką przy odbiorze zamówienia</p>
                        <Button variant="primary" type="submit" onClick={makeRequest}>
                            Wypożycz
                        </Button>
                        </div>  : null}
                    
                        </Form>
                         }
                         </div>
                    </div>
                    </div>

                </div>
                }
            </div>
        </div>
    )
}

export default Cart