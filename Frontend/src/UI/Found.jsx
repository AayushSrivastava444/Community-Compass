import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Found.css'
export default function Found() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
  }, [])

  const foundItems = items.filter(item => item.status === 'found')

  return (
    <div className="found-container">
      <h2>Found Items</h2>

      {foundItems.length === 0 && (
        <p style={{ textAlign: 'center', margin: '2rem 0' }}>
          No found items available.
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
        {foundItems.map(item => (
          <div className="card" key={item._id}>
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.name}
              className="card-image"
            />
            <h4>{item.name}</h4>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

