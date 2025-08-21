import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ViewItems({ filterStatus }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
  }, [])

  const filteredItems = filterStatus
    ? items.filter(item => item.status === filterStatus)
    : items

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h2>{filterStatus ? `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Items` : 'All Items'}</h2>
      {filteredItems.length === 0 && <p>No items found.</p>}
      {filteredItems.map(item => (
        <div
          key={item._id}
          style={{
            border: '1px solid #ccc',
            padding: 16,
            marginBottom: 16,
            borderRadius: 6,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <img
            src={`http://localhost:5000${item.image}`}
            alt={item.name}
            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6 }}
          />
          <div>
            <h3>{item.name}</h3>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Description:</strong> {item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
