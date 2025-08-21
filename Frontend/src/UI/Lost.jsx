import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Lost.css';
import { API_BASE } from '../lib/api';

export default function Lost() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/items`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const lostItems = items.filter(item => item.status === 'lost');

  return (
    <div className="lost-container">
      <h2>Lost Items</h2>

      {lostItems.length === 0 && (
        <p style={{ textAlign: 'center', margin: '2rem 0' }}>
          No lost items found.
        </p>
      )}

      <div
        className="cards-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
        }}
      >
        {lostItems.map(item => (
          <div className="card" key={item._id}>
            {item.image ? (
              <img
                src={`${API_BASE}${item.image}`}
                alt={item.name}
                className="card-image"
              />
            ) : null}
            <h4>{item.name}</h4>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

