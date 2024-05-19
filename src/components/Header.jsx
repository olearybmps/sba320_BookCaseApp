// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Define Header component
function Header() {
    // Render component
    return (
        <header className="header">
            {/* Render the title */}
            <h1>The Book Case</h1>
            {/* Render the navigation menu */}
            <nav>
                <ul>
                    {/* Render a navigation link to the home page */}
                    <li>
                        <Link to="/">Best Sellers</Link>
                    </li>
                    {/* Render a navigation link to the search page */}
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

// Export the Header component as the default export
export default Header;
