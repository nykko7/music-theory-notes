import React, { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>
        <strong>Count:</strong> {count}
      </p>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'darkslateblue',
          color: 'white',
          padding: '5px 20px',
          fontWeight: 'bold',
        }}
      >
        +
      </button>
    </div>
  )
}
