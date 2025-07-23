import React from 'react'
import './Flashcards.css'

export default function Flashcards({ items }) {
  return (
    <div className="flashcards-container">
      {items.map(item => (
        <div className="flashcard" key={item._id}>
          {item.image && (
            <img src={`http://localhost:5000${item.image}`} alt={item.name} className="flashcard-image" />
          )}
          <h3>{item.name}</h3>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Location:</strong> {item.location}</p>
          {item.description && <p>{item.description}</p>}
        </div>
      ))}
    </div>
  )
}
