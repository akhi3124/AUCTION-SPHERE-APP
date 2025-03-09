import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

function BidItem() {
    const { itemId } = useParams(); // Get itemId from URL parameters
    const navigate = useNavigate(); // Initialize useNavigate
    const [bid, setBid] = useState("");
    const [bidder, setBidder] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/items/${itemId}`, { currentBid: parseFloat(bid), bidder });
            setMessage("Bid placed successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error placing bid.");
        }
    };

    return (
        <div className="container mt-4">
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                Back
            </button>
            <h2>Place Bid</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Item ID</label>
                    <input type="text" className="form-control" value={itemId} readOnly /> {/* Pre-fill Item ID */}
                </div>
                <div className="mb-3">
                    <label className="form-label">Your Bid</label>
                    <input
                        type="number"
                        className="form-control"
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={bidder}
                        onChange={(e) => setBidder(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Place Bid</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default BidItem;