// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAuction = () => {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [endDate, setEndDate] = useState('');
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get('http://localhost:5000/api/auction-items');
        setItems(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingItemId) {
            await axios.put(`http://localhost:5000/api/auction-items/${editingItemId}`, {
                title,
                description,
                startingBid,
                endDate,
            });
        } else {
            await axios.post('http://localhost:5000/api/auction-items', {
                title,
                description,
                startingBid,
                endDate,
            });
        }
        resetForm();
        fetchItems();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStartingBid('');
        setEndDate('');
        setEditingItemId(null);
    };

    const handleEdit = (item) => {
        setTitle(item.title);
        setDescription(item.description);
        setStartingBid(item.startingBid);
        setEndDate(item.endDate);
        setEditingItemId(item._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/auction-items/${id}`);
        fetchItems();
    };

    return (
        <div>
            <h1>Auction Items</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="number" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} placeholder="Starting Bid" required />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                <button type="submit">{editingItemId ? 'Update' : 'Create'} Auction Item</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>Starting Bid: ${item.startingBid}</p>
                        <p>Ends on: {new Date(item.endDate).toLocaleString()}</p>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateAuction;
