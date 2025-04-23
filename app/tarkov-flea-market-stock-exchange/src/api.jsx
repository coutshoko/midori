import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';

const endpoint = 'https://api.tarkov.dev/graphql';

const query = gql`
{
    items(lang: en) {
        baseImageLink
        name
        changeLast48hPercent
        description
        low24hPrice
        high24hPrice
    }
}
`;

const FilteredItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request(endpoint, query);
        const filteredItems = data.items.filter(
          item => item.changeLast48hPercent <= -50 && item.changeLast48hPercent !== -100
        );
        setItems(filteredItems);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-500 text-xl">Loading...</p>
        <img src="./assets/rat.JPG" alt="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-400">Filtered Items</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {items.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <img
                src={item.baseImageLink}
                alt={item.name}
                className="mb-4 w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-green-500">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-gray-800 text-sm mb-1">
                <strong>Low Price (24h):</strong> ${item.low24hPrice}
              </p>
              <p className="text-gray-800 text-sm mb-1">
                <strong>High Price (24h):</strong> ${item.high24hPrice}
              </p>
              <p className="text-sm text-red-600">
                <strong>Change (48h):</strong> {item.changeLast48hPercent}%
              </p>
              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-xl">No items meet the filter criteria.</p>
      )}
      <footer className="pb-8">
        <a
          href="https://github.com/astarshoko/tarkov-flea-market-stock-exchange"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default FilteredItems;