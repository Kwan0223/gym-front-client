import React, { useState } from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchItem, setSearchItem] = useState({
        area: '',
        name: ''
    });

    const handleInputChange = (event) => {
        setSearchItem({
            ...searchItem,
            [event.target.name]: event.target.value
        });
    };

    const handleSearchClick = () => {
        onSearch(searchItem);
    };

    return (
        <div className="search-container">
            <select
                className="search-dropdown"
                name="area"
                value={searchItem.area}
                onChange={handleInputChange}
            >
                <option value="1">이름</option>
                <option value="2">지역</option>
            </select>
            <input
                className="search-input"
                type="text"
                name="name"
                placeholder="Search by name"
                value={searchItem.name}
                onChange={handleInputChange}
            />
            <button onClick={handleSearchClick}>검색</button>
        </div>
    );
};

export default SearchBar;
