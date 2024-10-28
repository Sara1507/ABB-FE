// AuctionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AuctionList = () => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await axios.get('http://localhost:5000/api/auctions'); // Adjust the endpoint as necessary
      setAuctions(response.data);
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    // Filter auctions based on the search term
    setFilteredAuctions(
      auctions.filter(auction =>
        auction.item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, auctions]);

  return (
    <div>
      <h1>Auction Items</h1>
      <input
        type="text"
        placeholder="Search for auction items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <li key={auction.id}>
              <Link to={`/auction/${auction.id}`}>
                {auction.item} - Current Highest Bid: ${auction.highestBid}
              </Link>
            </li>
          ))
        ) : (
          <li>No auction items found.</li>
        )}
      </ul>
      <h3>Click on the below button to create a auction.</h3>
      <button onClick={() => navigate('/auction-form')}>Create Auction</button>
    </div>
  );
};

export default AuctionList;
