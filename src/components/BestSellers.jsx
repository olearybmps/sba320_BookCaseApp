// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import './BestSellers.css';

// Define BestSellers component
function BestSellers() {
    // Declare state variables using useState hook
    const [lists, setLists] = useState([]);

    // Use the useEffect hook to fetch data when component mounts
    // (to be initialized and inserted in the DOM)
    useEffect(() => {
        // Define asynchronous function to fetch best sellers lists
        const fetchLists = async () => {
            // Get NYTimes API key from environment variables
            const nytApiKey = import.meta.env.VITE_NYTIMES_API_KEY;

            // Make request to NYTimes Books API to fetch all best sellers lists
            const response = await fetch(
                `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${nytApiKey}`
            );

            // Parse response data as JSON
            const data = await response.json();

            // Update lists state with fetched data
            setLists(data.results.lists);
        };

        // Call fetchLists function
        fetchLists();
        // Empty dependency array ensures effect runs only once when component mounts
    }, []);

    // Define functions to open Google Books and Amazon pages for specific book
    const openGoogleBooks = (book) => {
        const isbn = book.primary_isbn10 || book.primary_isbn13;
        const url = `http://books.google.com/books?vid=ISBN${isbn}`;
        window.open(url, '_blank');
    };

    const openAmazon = (book) => {
        const isbn = book.primary_isbn10 || book.primary_isbn13;
        const url = `https://www.amazon.com/dp/${isbn}?tag=thenewyorktim-20`;
        window.open(url, '_blank');
    };

    // Render component
    return (
        <div className="best-sellers">
            <h1>NYT Best Sellers</h1>
            {/* Map over the lists and render each list */}
            {lists.map((list) => (
                <div key={list.list_id} className="list">
                    <h2>{list.display_name}</h2>
                    <div className="book-grid">
                        {/* Map over the books in each list and render book cards */}
                        {list.books.map((book) => (
                            <div
                                key={book.primary_isbn10}
                                className="book-card"
                            >
                                <img src={book.book_image} alt={book.title} />
                                <div className="book-details">
                                    <p>List Ranking: {book.rank}</p>
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                    <div className="book-links">
                                        {/* Button to open Google Books page */}
                                        <button
                                            onClick={() =>
                                                openGoogleBooks(book)
                                            }
                                        >
                                            See more on Google Books
                                        </button>
                                        {/* Button to open Amazon page */}
                                        <button
                                            onClick={() => openAmazon(book)}
                                        >
                                            Buy on Amazon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Export BestSellers component as default export
export default BestSellers;
