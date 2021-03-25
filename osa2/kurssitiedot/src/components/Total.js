import React from 'react'

const Total = ( {parts} ) => {
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
      <div>
        <p>Number of exercises {totalAmount}</p>
      </div>
    )
  }

export default Total