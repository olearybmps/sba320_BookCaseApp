import React, { useState, useEffect } from 'react';
import './BestSellers.css';

function BestSellers() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            const nytApiKey = import.meta.env.VITE_NYTIMES_API_KEY;
            const response = await fetch(
                `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${nytApiKey}`
            );
            const data = await response.json();
            setLists(data.results.lists);
        };

        fetchLists();
    }, []);

    return (
        <div className="best-sellers">
            <h1>NYT Best Sellers</h1>
            {lists.map((list) => (
                <div key={list.list_id} className="list">
                    <h2>{list.display_name}</h2>
                    <div className="book-grid">
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
                                        <a
                                            href={`https://books.google.com/books?isbn=${book.primary_isbn10}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            See more on Google Books
                                        </a>
                                        <a
                                            href={`https://www.amazon.com/s?k=${book.primary_isbn10}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Buy on Amazon
                                        </a>
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

export default BestSellers;
