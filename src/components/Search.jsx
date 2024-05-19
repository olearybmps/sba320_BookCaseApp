// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import './Search.css';

// Define Search component
function Search() {
    // Declare state variables using the useState hook
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    // Use useEffect hook to load stored search results when component mounts
    // (to be initialized and inserted in the DOM)
    useEffect(() => {
        const storedBooks = localStorage.getItem('searchResults');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }
    }, []);

    // Define an asynchronous function to handle search
    const handleSearch = async () => {
        // Get Google API key from environment variables
        const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        // Set max number of results per request
        const maxResults = 20;

        // Make a request to Google Books API to fetch search results
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
        );

        // Parse response data as JSON
        const data = await response.json();
        // Extract search results from the response data
        const newBooks = data.items || [];

        // Update books state with new search results
        setBooks(newBooks);
        // Update total number of search results
        setTotalItems(data.totalItems);
        // Update start index for next request
        setStartIndex(maxResults);

        // Store search results in localStorage
        localStorage.setItem('searchResults', JSON.stringify(newBooks));
    };

    // Define an asynchronous function to load more search results
    const loadMore = async () => {
        // Get Google API key from environment variables
        const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        // Set max number of results per request
        const maxResults = 20;

        // Make a request to Google Books API to fetch more search results
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
        );
        // Parse response data as JSON
        const data = await response.json();
        // Extract additional search results from response data
        const moreBooks = data.items || [];

        // Update books state by appending additional search results
        setBooks([...books, ...moreBooks]);
        // Update start index for next request
        setStartIndex((prevIndex) => prevIndex + maxResults);

        // Store updated search results in localStorage
        localStorage.setItem(
            'searchResults',
            JSON.stringify([...books, ...moreBooks])
        );
    };

    // Define a function to reset search
    const resetSearch = () => {
        // Clear search term
        setSearchTerm('');
        // Clear the books state
        setBooks([]);
        // Reset start index
        setStartIndex(0);
        // Reset total number of search results
        setTotalItems(0);
        // Remove stored search results from localStorage
        localStorage.removeItem('searchResults');
    };

    // Render the component
    return (
        <div className="search">
            <h1>Search Books</h1>
            <div className="search-input">
                {/* Input field for search term */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter a book title, author, or keyword"
                />
                {/* Button to trigger search */}
                <button onClick={handleSearch}>Search</button>
                {/* Button to reset search */}
                <button onClick={resetSearch}>Reset</button>
            </div>
            <div className="book-grid">
                {/* Map over books and render book cards */}
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
                                {/* Button to open Google Books page */}
                                <a
                                    href={`https://books.google.com/books?id=${book.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button>View on Google Books</button>
                                </a>
                                {/* Button to open Amazon search page */}
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
            {/* Button to load more search results */}
            {startIndex < totalItems && (
                <button className="load-more" onClick={loadMore}>
                    Load More
                </button>
            )}
        </div>
    );
}

// Export Search component as default export
export default Search;
