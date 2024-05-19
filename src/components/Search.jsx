import React, { useState, useEffect } from 'react';
import './Search.css';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const storedBooks = localStorage.getItem('searchResults');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }
    }, []);

    const handleSearch = async () => {
        const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const maxResults = 20;

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
        );
        const data = await response.json();
        const newBooks = data.items || [];
        setBooks(newBooks);
        setTotalItems(data.totalItems);
        setStartIndex(maxResults);

        localStorage.setItem('searchResults', JSON.stringify(newBooks));
    };

    const loadMore = async () => {
        const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const maxResults = 20;

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
        );
        const data = await response.json();
        const moreBooks = data.items || [];
        setBooks([...books, ...moreBooks]);
        setStartIndex((prevIndex) => prevIndex + maxResults);

        localStorage.setItem(
            'searchResults',
            JSON.stringify([...books, ...moreBooks])
        );
    };

    const resetSearch = () => {
        setSearchTerm('');
        setBooks([]);
        setStartIndex(0);
        setTotalItems(0);
        localStorage.removeItem('searchResults');
    };

    return (
        <div className="search">
            <h1>Search Books</h1>
            <div className="search-input">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter a book title, author, or keyword"
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={resetSearch}>Reset</button>
            </div>
            <div className="book-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        <img
                            src={book.volumeInfo.imageLinks?.thumbnail || ''}
                            alt={book.volumeInfo.title}
                        />
                        <div className="book-details">
                            <h3>{book.volumeInfo.title}</h3>
                            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
                            <p>{book.volumeInfo.description}</p>
                            <div className="book-links">
                                <a
                                    href={`https://books.google.com/books?id=${book.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button>View on Google Books</button>
                                </a>
                                <a
                                    href={`https://www.amazon.com/s?k=${book.volumeInfo.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button>Search on Amazon</button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {startIndex < totalItems && (
                <button className="load-more" onClick={loadMore}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default Search;
