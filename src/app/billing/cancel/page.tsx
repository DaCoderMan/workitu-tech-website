'use client';

import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mb-6">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-gold-300 text-lg mb-8">
            Your payment was not completed. No charges were made.
          </p>

          {/* Info Box */}
          <div className="bg-black/50 border border-gold-500/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              What happened?
            </h2>
            <div className="text-left space-y-3 text-gold-300">
              <p>
                The payment process was interrupted or cancelled. This could happen if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gold-300/80 ml-4">
                <li>You clicked the back button during checkout</li>
                <li>You closed the payment window</li>
                <li>There was a connection issue</li>
                <li>You chose to cancel the payment</li>
              </ul>
              <p className="pt-3">
                <strong className="text-gold-400">Don't worry!</strong> No charges were made to your account.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="bg-black/30 border border-gold-500/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              What would you like to do?
            </h2>
            <div className="space-y-3">
              <Link
                href="/pay"
                className="block w-full px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all"
              >
                Try Again
              </Link>
              <Link
                href="/contact"
                className="block w-full px-6 py-3 bg-black border border-gold-500/30 text-gold-300 font-semibold rounded-lg hover:border-gold-400 transition-all"
              >
                Contact Us for Help
              </Link>
              <Link
                href="/"
                className="block w-full px-6 py-3 text-gold-300 hover:text-gold-400 font-medium transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>

          {/* Help */}
          <div className="text-center text-sm text-gold-300/70">
            <p>
              Need assistance?{' '}
              <a
                href="mailto:contact@workitu.com"
                className="text-gold-400 hover:text-gold-300"
              >
                contact@workitu.com
              </a>
            </p>
            <p className="mt-2">
              We're here to help with any payment questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
