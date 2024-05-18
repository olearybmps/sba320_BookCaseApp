import React, { useState, useEffect } from 'react';

function BestSellers() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const nytApiKey = import.meta.env.VITE_NYTIMES_API_KEY;
            const response = await fetch(
                `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nytApiKey}`
            );
            const data = await response.json();
            setBooks(data.results?.books || []);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>NYT Best Sellers</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.primary_isbn10}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default BestSellers;
