import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Error</h2>
      <p>{message}</p>
      <p className="mt-2">Please try again later or contact support if the problem persists.</p>
      <p className="mt-2">`Error - ${message}`</p>
    </div>
  );
}

export default ErrorMessage;