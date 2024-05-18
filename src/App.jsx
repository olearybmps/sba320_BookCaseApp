import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BestSellers from './components/BestSellers';
import Search from './components/Search';
import './App.css';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<BestSellers />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
