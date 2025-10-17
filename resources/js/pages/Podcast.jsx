import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Podcast from '../components/Podcast.jsx';

export default function PodcastPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gamma">
            <Navbar />
            <main className="pt-24">
                <Podcast />
            </main>
            <Footer />
        </div>
    );
}


