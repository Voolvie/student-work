import React, {useContext} from "react";
import {DropdownButton, Dropdown } from "react-bootstrap"
import { CategoryContext } from "../../context/CategoryContext";
import '../../styles/styles.scss'

const NavbarBooks = () => {
    const [category, setCategory] = useContext(CategoryContext)

    
    return (
        <div>
           <DropdownButton className="btn-category" title="Kategoria">
                <Dropdown.Item onClick={() => setCategory("")}>Wszystko</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item  onClick={() => setCategory("Biografia")}>Biografia</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Historia")}>Historia</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Literatura młodzieżowa")}>Literatura młodzieżowa</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Powieść")}>Powieść</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Dla dzieci")}>Dla dzieci</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Horror")}>Horror</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Literatura obyczajowa")}>Literatura obyczajowa</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Romans")}>Romans</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Filozofia")}>Filozofia</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Lektury")}>Lektury</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Literatura piękna")}>Literatura piękna</Dropdown.Item>
                <Dropdown.Item  onClick={() => setCategory("Sensacja Thriller")}>Sensacja Thriller</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}  

export default NavbarBooks