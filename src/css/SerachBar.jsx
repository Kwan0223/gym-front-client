import React, { useState } from 'react';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted search:', search);
        // Implement your search logic here
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                헬스는 | 헬스매니아 | 검색하기
            </button>

        </form>
    );
}

export default SearchBar;
