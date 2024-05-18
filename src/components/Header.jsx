import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1>The Book Case</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Best Sellers</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
