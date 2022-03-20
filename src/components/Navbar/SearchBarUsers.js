import React, { useContext, useEffect, useState } from 'react'
import "../../styles/styles.scss"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../context/AuthContext";
import { FilterContext } from '../../context/FilterContext';
import { CategoryContext } from '../../context/CategoryContext';

function SearchBarUsers ({ placeholder, data }) {
  
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { currentUser } = useAuth()
  const [filter, setFilter] = useContext(CategoryContext)


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.userEmail.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearFilter = () => {
    setFilter('')
  }
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  }
  const setFilterButton = (value) => {
    setFilter(value.userEmail)
    clearInput()

  }
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          onClick={clearFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
                  <button className='buttonOnclick' onClick={() => setFilterButton(value)}>{value.userEmail}</button>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBarUsers;