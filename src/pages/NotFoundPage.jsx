import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <div className="text-8xl font-serif font-bold text-[#C4704A]">404</div>
      <h1 className="text-3xl font-serif font-bold text-text-primary">Page Not Found</h1>
      <p className="text-text-secondary max-w-md">
        The route you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-[#C4704A] text-white font-semibold hover:bg-[#A85C38] transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
