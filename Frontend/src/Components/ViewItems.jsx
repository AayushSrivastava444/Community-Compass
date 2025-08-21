import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';

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
        setErr(e.response?.data?.message || e.message);
      }
    };
    fetchItems();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>All Items</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item._id} style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} style={{ maxWidth: 240, borderRadius: 6 }} />
              )}
              <strong>{item.name}</strong>
              <div>Description: {item.description}</div>
              <div>Location: {item.location}</div>
              <div>Status: {item.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

