import React, { useState } from 'react';
import axios from 'axios';

const PerformanceTestForm = ({ token, setPerformanceScore }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('desktop');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/lighthouse-test',
        { url, platform },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPerformanceScore(response.data.performance_score);
    } catch (error) {
      console.error("Error fetching performance score", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
        className="border p-2 mb-4 w-full max-w-lg rounded"
        required
      />
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="border p-2 mb-4 w-full max-w-lg rounded"
      >
        <option value="desktop">Desktop</option>
        <option value="mobile">Mobile</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Get Performance Score
      </button>
    </form>
  );
};

export default PerformanceTestForm;
