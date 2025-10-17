import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Book from '../components/Book.jsx';

export default function BookPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gamma">
            <Navbar />
            <main className="pt-24">
                <Book />
            </main>
            <Footer />
        </div>
    );
}


