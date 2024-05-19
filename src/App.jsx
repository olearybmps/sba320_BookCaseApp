// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BestSellers from './components/BestSellers';
import Search from './components/Search';
import './App.css';
import Header from './components/Header';

// Define App component
function App() {
    // Render the component
    return (
        // Set up Router for handling client-side routing
        <Router>
            <div>
                {/* Render Header component */}
                <Header />
                {/* Define Routes for different pages */}
                <Routes>
                    {/* Define route for home page (Best Sellers) */}
                    <Route path="/" element={<BestSellers />} />
                    {/* Define route for search page */}
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </Router>
    );
}

// Export App component as default export
export default App;
