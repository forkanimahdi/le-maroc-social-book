import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setShow(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setShow(true);
        } else if (flash?.message) {
            setMessage(flash.message);
            setType('success');
            setShow(true);
        }

        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash, show]);

    if (!show || !message) return null;

    return (
        <div className="fixed top-20 right-4 z-50 max-w-md animate-in slide-in-from-top-5">
            <div
                className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
                    type === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                }`}
            >
                {type === 'success' ? (
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                )}
                <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {message}
                </p>
                <button
                    onClick={() => {
                        setShow(false);
                        setMessage(null);
                    }}
                    className="ml-auto text-zinc-400 hover:text-zinc-600"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

