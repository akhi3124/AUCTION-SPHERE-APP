import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItemForm({ addItem }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [endTime, setEndTime] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem({ name, description, startPrice: parseFloat(startPrice), endTime: new Date(endTime), image });
        setName('');
        setDescription('');
        setStartPrice('');
        setEndTime('');
        setImage('');
        navigate('/'); // Redirect to home page after adding item
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Start Price</label>
                <input type="number" className="form-control" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">End Time</label>
                <input type="datetime-local" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
    );
}

export default AddItemForm;