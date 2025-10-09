"use client";

import Link from "next/link";

export default function EmailConfirmationSent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-700 text-center">
        <div className="mb-4 flex justify-center">
          {/* You could replace this with an icon or logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-white mb-2">
          Confirm Your Email
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          We’ve sent a confirmation link to your email address.  
          Please check your inbox and click the link to verify your account.
        </p>

        <Link
          href="/auth/login"
          className="inline-block bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded-lg text-white font-medium shadow-lg"
        >
          Back to Login
        </Link>

        <p className="text-gray-500 text-xs mt-4">
          Didn’t get the email? Check your spam folder or try signing up again.
        </p>
      </div>
    </div>
  );
}
