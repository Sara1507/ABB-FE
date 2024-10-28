import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Biddingform() {
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchAuction = async () => {
      const response = await axios.get('http://localhost:5000/api/auctions/1');
      setAuction(response.data);
    };
    fetchAuction();

    socket.on('outbid', ({ user, amount }) => {
      setNotification(`You were outbid by ${user} with a bid of $${amount}`);
    });

    return () => {
      socket.off('outbid');
    };
  }, []);

  const placeBid = async () => {
    if (bidAmount && auction) {
      const response = await axios.post(`http://localhost:5000/api/auctions/1/bid`, {
        user: 'Current User', // Replace with actual user data
        amount: parseInt(bidAmount),
      });
      if (response.data.success) {
        setAuction((prev) => ({ ...prev, highestBid: response.data.highestBid }));
        setBidAmount('');
      } else {
        alert(response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Auction: {auction?.item}</h1>
      <h2>Current Highest Bid: ${auction?.highestBid}</h2>
      <h3>Bid History:</h3>
      <ul>
        {auction?.bidHistory.map((bid, index) => (
          <li key={index}>{bid.user}: ${bid.amount}</li>
        ))}
      </ul>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
      />
      <button onClick={placeBid}>Place Bid</button>
      {notification && <p>{notification}</p>}
    </div>
  );
}

export default Biddingform;
