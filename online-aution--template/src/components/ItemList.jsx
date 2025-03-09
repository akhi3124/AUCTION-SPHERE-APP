import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Item from "./Item";

function ItemList({ items, updateBid }) {
    const navigate = useNavigate(); // Initialize useNavigate

    if (!items) {
        return <p>Loading items...</p>;
    }

    if (items.length === 0) {
        return <p>No items available.</p>;
    }

    return (
        <div className="item-list">
            {items.map((item) => (
                <div key={item._id} className="item-card">
                    <Item item={item} updateBid={updateBid} />
                    <div className="card-body">
                        <button onClick={() => navigate(`/bidItem/${item._id}`)} className="btn btn-primary">
                            Bid
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemList