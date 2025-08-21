import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AddItem.css'

export default function AddItem() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('lost')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleImageChange = e => setImage(e.target.files[0])

  const handleSubmit = async e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('date', date);
  formData.append('location', location);
  formData.append('status', status);
  if (image) {
    formData.append('image', image);
  }

  try {
    await axios.post('http://localhost:5000/api/items', formData);
    setName(''); setDescription(''); setDate(''); setLocation(''); setStatus('lost'); setImage(null);
    alert('Item submitted successfully!');
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    console.error('Submit error:', msg);
    alert('Error submitting: ' + msg);
  }
};


  return (
    <div className="add-item-container">
      <h2>Add Lost/Found Item</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text" placeholder="Item Name"
          value={name} onChange={e => setName(e.target.value)} required
        />

        <textarea
          placeholder="Description"
          value={description} onChange={e => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          value={date} onChange={e => setDate(e.target.value)}
          required
        />

        <div className="status-group">
          <label>
            <input
              type="radio" name="status" value="lost"
              checked={status==='lost'} onChange={()=>setStatus('lost')}
            /> Lost
          </label>
          <label>
            <input
              type="radio" name="status" value="found"
              checked={status==='found'} onChange={()=>setStatus('found')}
            /> Found
          </label>
        </div>

        <textarea
          className="location-textarea"
          placeholder="Location (e.g. Near Park)"
          value={location} onChange={e => setLocation(e.target.value)}
          required
        />

        <input type="file" onChange={handleImageChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

