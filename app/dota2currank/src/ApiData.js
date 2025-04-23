import React, { useState, useEffect } from "react";
import herald from './img/herald.png';
import guardian from './img/guardian.png';
import crusader from './img/crusader.png';
import archon from './img/archon.png';
import legend from './img/legend.png';
import ancient from './img/ancient.png';
import divine from './img/divine.png';
import immortal from './img/immortal.png';
import sonic from './img/freaksonic.gif';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.opendota.com/api/players/930752070"); // Replace with your API URL
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-xl text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error: {error}</p>;

  const rank = {
    realrank: Math.round(data.rank_tier / 10),
    tier: data.rank_tier % 10
  };

  const map = {
    1: herald,
    2: guardian,
    3: crusader,
    4: archon,
    5: legend,
    6: ancient,
    7: divine,
    8: immortal
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-green-200 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Shoko's Rank is😛</h1>
      <div className="flex items-center justify-center">
        <img
          src={map[rank.realrank]}
          alt={`Rank: ${rank.realrank}`}
          className="w-40 h-40"
        />
      </div>
      <p className="mt-4 text-xl font-bold text-gray-700 bold">Tier: {rank.tier}</p>
      <p>Current Name : {data.profile.personaname}</p>
      <p>ID : {data.profile.account_id}</p>
      <img src={sonic} className="w-40 h-10"></img>
    </div>
  );
};

export default ApiData;