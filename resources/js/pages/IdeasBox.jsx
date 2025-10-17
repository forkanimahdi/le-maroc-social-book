import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import IdeasBox from '../components/IdeasBox.jsx';

export default function IdeasPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gamma">
            <Navbar />
            <main className="pt-24">
                <IdeasBox />
            </main>
            <Footer />
        </div>
    );
}


