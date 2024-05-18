import React, { useState } from 'react';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleApiKey}`
        );
        const data = await response.json();
        setBooks(data.items || []);
    };

    return (
        <div>
            <h1>Search Books</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.volumeInfo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
