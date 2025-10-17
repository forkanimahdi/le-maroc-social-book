import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Groups from '../components/Groups.jsx';

export default function GroupsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gamma">
            <Navbar />
            <main className="pt-24">
                <Groups />
            </main>
            <Footer />
        </div>
    );
}


