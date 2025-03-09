import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import Register from "./components/Register";
import Login from "./components/Login";
import BidItem from "./components/BidItem";

import "./App.css";

function App() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data } = await axios.get("/api/items");
            setItems(data);
            setFilteredItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const addItem = async (newItem) => {
        try {
            await axios.post("/api/items", newItem);
            fetchItems();
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const updateBid = async (id, bid, bidder) => {
        try {
            await axios.put(`/api/items/${id}`, { currentBid: bid, bidder: bidder });
            fetchItems();
        } catch (error) {
            console.error("Error updating bid:", error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = items.filter((item) => {
            return item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
        });
        setFilteredItems(filtered);
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="app-header">
                    <h1>Auction Sphere</h1>
                    <div className="auth-buttons">
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                        <Link to="/register" className="btn btn-link">
                            Register
                        </Link>
                        <Link to="/login" className="btn btn-link">
                            Login
                        </Link>
                        <Link to="/addItem" className="btn btn-link">
                            Add Item
                        </Link>
                        <Link to="/bidItem/new" className="btn btn-link">
                            Bid Item
                        </Link>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search items..." value={searchQuery} onChange={handleSearch} />
                    </div>
                </header>

                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<ItemList items={filteredItems} updateBid={updateBid} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/addItem" element={<AddItemForm addItem={addItem} />} />
                        <Route path="/bidItem/:itemId" element={<BidItem />} />
                        <Route path="/bidItem/new" element={<BidItem />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}


export default App;