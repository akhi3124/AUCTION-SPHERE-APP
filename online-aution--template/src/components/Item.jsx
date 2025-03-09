import React, { useState, useEffect } from 'react';
import BidForm from './BidForm';

function Item({ item, updateBid }) {
    const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(item.endTime).getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Auction Ended');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item.endTime]);

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={item.image} className="card-img-top" alt={item.name} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text">Start Price: ${item.startPrice}</p>
          <p className="card-text">Current Bid: ${item.currentBid}</p>
          <p className="card-text">Bidder: {item.bidder}</p>
          <p className="card-text">End Time: {new Date(item.endTime).toLocaleString()}</p>
          <p className="card-text">Time Left: {timeLeft}</p>
          <BidForm itemId={item._id} currentBid={item.currentBid} updateBid={updateBid} />
        </div>
      </div>
    </div>
  );
}

export default Item;
