import React from 'react';

const ResultDisplay = ({ performanceScore }) => {
  return (
    <div className="text-center mt-4">
      {performanceScore !== null ? (
        <p className="text-2xl font-bold">
          Performance Score: {performanceScore}
        </p>
      ) : (
        <p>No performance score available</p>
      )}
    </div>
  );
};

export default ResultDisplay;
