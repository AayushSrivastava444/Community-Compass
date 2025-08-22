import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';
import './ViewItem.css';
export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setErr('');
      try {
        const res = await axios.get(`${API_BASE}/api/items`);
        setItems(res.data || []);
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to fetch items.');
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="view-items-container">
      <h2>All Items</h2>
      {err && <p className="error-message">{err}</p>}
      
      {!err && items.length === 0 && <p>No items found.</p>}

      <div className="items-grid">
        {items.map(item => (
          <div className="item-card" key={item._id}>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="item-image" />
            )}
            <h3 className="item-name">{item.name}</h3>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

