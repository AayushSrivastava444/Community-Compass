import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';
import './AddItem.css';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('lost');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  // Snap to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleImageChange = (e) => setImage(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('status', status);
    if (image) formData.append('image', image);

    try {
      await axios.post(`${API_BASE}/api/items`, formData);
      setName(''); setDescription(''); setDate(''); setLocation(''); setStatus('lost'); setImage(null);
      setOk('Item submitted successfully!');
    } catch (x) {
      setErr(x.response?.data?.message || x.message);
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add Lost/Found Item</h2>

      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
      {ok && <p style={{ color: 'green', textAlign: 'center' }}>{ok}</p>}

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />

        <div className="status-group">
          <label>
            <input
              type="radio"
              name="status"
              value="lost"
              checked={status === 'lost'}
              onChange={() => setStatus('lost')}
            /> Lost
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="found"
              checked={status === 'found'}
              onChange={() => setStatus('found')}
            /> Found
          </label>
        </div>

        <textarea
          className="location-textarea"
          placeholder="Location (e.g. Near Park)"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />

        <input type="file" onChange={handleImageChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
