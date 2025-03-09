import React, { useState } from 'react';

function BidForm({ itemId, currentBid, updateBid }) {
  const [bid, setBid] = useState('');
  const [bidder, setBidder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = parseFloat(bid);
    if (newBid > currentBid) {
      updateBid(itemId, newBid, bidder);
      setBid('');
      setBidder('');
    } else {
      alert('Your bid must be higher than the current bid.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bid-form">
      <div className="mb-3">
        <label className="form-label">Your Bid</label>
        <input type="number" className="form-control" value={bid} onChange={(e) => setBid(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Name</label>
        <input type="text" className="form-control" value={bidder} onChange={(e) => setBidder(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-success">Place Bid</button>
    </form>
  );
}

export default BidForm;