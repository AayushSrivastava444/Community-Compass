import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';
import './Lost.css';

export default function Lost() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const fetchLostItems = async () => {
      setErr('');
      try {
        const res = await axios.get(`${API_BASE}/api/items`);
        setItems(res.data.filter(item => item.status === 'lost'));
      } catch (e) {
        setErr(e.response?.data?.message || e.message);
      }
    };
    fetchLostItems();
  }, []);

  return (
    <div className="lost-container">
      <h2>Lost Items</h2>
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', margin: '2rem 0' }}>No lost items found.</p>
      ) : (
        <div
          className="cards-container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
        >
          {items.map(item => (
            <div className="card" key={item._id}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="card-image" />
              )}
              <h4>{item.name}</h4>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


