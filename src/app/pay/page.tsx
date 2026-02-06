'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [projectName, setProjectName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert dollars to cents
      const amountInCents = Math.round(parseFloat(amount) * 100);

      if (isNaN(amountInCents) || amountInCents < 100) {
        throw new Error('Amount must be at least $1.00');
      }

      if (amountInCents > 1000000) {
        throw new Error('Amount cannot exceed $10,000');
      }

      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offeringKey: 'custom_project_payment',
          customData: {
            amount: amountInCents,
            projectName,
            email,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create checkout');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Project Payment
          </h1>
          <p className="text-gold-300 text-lg">
            Pay for your Workitu Tech project - you choose the amount
          </p>
        </div>

        <div className="bg-black/50 border border-gold-500/20 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gold-400 mb-2"
              >
                Payment Amount (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300 text-lg">
                  $
                </span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="1"
                  max="10000"
                  required
                  className="w-full pl-8 pr-4 py-3 bg-black border border-gold-500/30 rounded-lg text-gold-300 placeholder-gold-300/50 focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
              <p className="mt-2 text-sm text-gold-300/70">
                Minimum: $1.00 | Maximum: $10,000.00
              </p>
            </div>

            {/* Project Name */}
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gold-400 mb-2"
              >
                Project Name (Optional)
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Company Website Redesign"
                maxLength={100}
                className="w-full px-4 py-3 bg-black border border-gold-500/30 rounded-lg text-gold-300 placeholder-gold-300/50 focus:outline-none focus:border-gold-400 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gold-400 mb-2"
              >
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-black border border-gold-500/30 rounded-lg text-gold-300 placeholder-gold-300/50 focus:outline-none focus:border-gold-400 transition-colors"
              />
              <p className="mt-2 text-sm text-gold-300/70">
                We'll send your receipt to this email
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Checkout...' : 'Proceed to Payment'}
            </button>

            {/* Info */}
            <div className="text-center text-sm text-gold-300/70">
              <p>Secure payment powered by LemonSqueezy</p>
              <p className="mt-2">
                Questions? Email{' '}
                <a
                  href="mailto:contact@workitu.com"
                  className="text-gold-400 hover:text-gold-300"
                >
                  contact@workitu.com
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Example Payments */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div
            className="bg-black/30 border border-gold-500/20 rounded-lg p-6 cursor-pointer hover:border-gold-400/50 transition-colors"
            onClick={() => setAmount('320')}
          >
            <h3 className="text-gold-400 font-semibold mb-2">Basic Website</h3>
            <p className="text-2xl font-bold text-gold-300">$320</p>
            <p className="text-sm text-gold-300/70 mt-2">
              Professional website package
            </p>
          </div>

          <div
            className="bg-black/30 border border-gold-500/20 rounded-lg p-6 cursor-pointer hover:border-gold-400/50 transition-colors"
            onClick={() => setAmount('670')}
          >
            <h3 className="text-gold-400 font-semibold mb-2">AI Application</h3>
            <p className="text-2xl font-bold text-gold-300">$670</p>
            <p className="text-sm text-gold-300/70 mt-2">
              Custom AI-powered solution
            </p>
          </div>

          <div
            className="bg-black/30 border border-gold-500/20 rounded-lg p-6 cursor-pointer hover:border-gold-400/50 transition-colors"
            onClick={() => setAmount('950')}
          >
            <h3 className="text-gold-400 font-semibold mb-2">E-Commerce</h3>
            <p className="text-2xl font-bold text-gold-300">$950</p>
            <p className="text-sm text-gold-300/70 mt-2">
              Complete online store setup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
