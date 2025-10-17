import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Newsletter from '../components/Newsletter.jsx';

export default function NewsletterPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gamma">
            <Navbar />
            <main className="pt-24">
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}


