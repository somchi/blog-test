// @/app/posts/components/ErrorState.tsx
import React from 'react';

interface ErrorStateProps {
  message?: string;
  status?: number;
  onRetry?: () => void;
}

export const ErrorState = ({ message, status, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg my-4">
      <h2 className="text-xl font-bold text-gray-800">
        {status ? `Error ${status}` : 'Something went wrong'}
      </h2>

      <p className="text-gray-600 mt-1 mb-6 text-center">
        {message || 'We couldn’t load the posts. Please check your connection.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
