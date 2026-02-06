'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');
  const projectName = searchParams.get('project');

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Payment Successful!
          </h1>

          <p className="text-gold-300 text-lg mb-8">
            Thank you for your payment. We've received it successfully.
          </p>

          {/* Details */}
          <div className="bg-black/50 border border-gold-500/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              Payment Details
            </h2>
            <div className="space-y-3">
              {orderId && (
                <div className="flex justify-between">
                  <span className="text-gold-300/70">Order ID:</span>
                  <span className="text-gold-300 font-mono">{orderId}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gold-300/70">Amount:</span>
                  <span className="text-gold-300 font-semibold">${amount}</span>
                </div>
              )}
              {projectName && (
                <div className="flex justify-between">
                  <span className="text-gold-300/70">Project:</span>
                  <span className="text-gold-300">{projectName}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-gold-500/20">
                <span className="text-gold-300/70">Status:</span>
                <span className="text-green-400 font-semibold">✓ Confirmed</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-black/30 border border-gold-500/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              What Happens Next?
            </h2>
            <div className="text-left space-y-3 text-gold-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400">1.</span>
                <p>You'll receive a receipt via email within a few minutes</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400">2.</span>
                <p>Our team will be notified and will reach out to you shortly</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400">3.</span>
                <p>We'll schedule a kickoff call to discuss your project details</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400">4.</span>
                <p>Work on your project will begin as scheduled</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-black border border-gold-500/30 text-gold-300 font-semibold rounded-lg hover:border-gold-400 transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Help */}
          <div className="mt-12 text-center text-sm text-gold-300/70">
            <p>
              Questions about your payment?{' '}
              <a
                href="mailto:contact@workitu.com"
                className="text-gold-400 hover:text-gold-300"
              >
                contact@workitu.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
