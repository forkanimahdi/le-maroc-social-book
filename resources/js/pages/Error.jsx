import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Error({ status, message }) {
    const title = {
        503: 'Service Unavailable',
        500: 'Server Error',
        404: 'Page Not Found',
        403: 'Forbidden',
    }[status] || 'Something went wrong';

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Sorry, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || message || 'An error occurred while processing your request.';

    return (
        <div className="min-h-screen bg-gradient-to-br from-royal-red-soft via-cream to-gold-soft flex items-center justify-center px-4">
            <Head title={title} />
            
            <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
                {/* Error Icon */}
                <div className="mb-6">
                    <div className="mx-auto w-24 h-24 bg-royal-red-soft rounded-full flex items-center justify-center">
                        <svg 
                            className="w-12 h-12 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-6xl font-bold text-royal-red-soft mb-4">
                    {status}
                </h1>

                {/* Error Title */}
                <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
                    {title}
                </h2>

                {/* Error Description */}
                <p className="text-zinc-600 mb-8">
                    {description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-zinc-200 text-zinc-800 rounded-lg font-semibold hover:bg-zinc-300 transition-colors duration-300"
                    >
                        Go Back
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-royal-red text-white rounded-lg font-semibold hover:bg-royal-red/90 transition-colors duration-300"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}


