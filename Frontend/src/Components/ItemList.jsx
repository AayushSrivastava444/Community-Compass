import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ItemList({ filterStatus }) {
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
    <ul style={{ maxWidth: 600, margin: 'auto', padding: 0, listStyle: 'none' }}>
      {filteredItems.length === 0 && <p>No items found.</p>}
      {filteredItems.map(item => (
        <li key={item._id} style={{ borderBottom: '1px solid #ccc', padding: 16, display: 'flex', gap: 16 }}>
          <img
            src={`http://localhost:5000${item.image}`}
            alt={item.name}
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6 }}
          />
          <div>
            <h3>{item.name}</h3>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
