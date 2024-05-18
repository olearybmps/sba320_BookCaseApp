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
                                        <button
                                            onClick={() =>
                                                openGoogleBooks(book)
                                            }
                                        >
                                            See more on Google Books
                                        </button>
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

export default BestSellers;
