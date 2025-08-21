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
        const res = await axios.get(`${API_BASE}/api/items/all`);
        setItems(res.data || []);
      } catch (x) {
        setErr(x.response?.data?.message || x.message);
      }
    };
    fetchItems();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>Items</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((it) => (
            <li key={it._id} style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <strong>{it.name}</strong> — {it.status} — {it.location}
              <div style={{ color: '#666' }}>{it.description}</div>
              {it.imageUrl && (
                <div style={{ marginTop: '0.5rem' }}>
                  <img src={it.imageUrl} alt={it.name} style={{ maxWidth: 240, borderRadius: 6 }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

