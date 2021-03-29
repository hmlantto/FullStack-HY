import React from 'react'

const Filter = ( {filterBy, handleFiltering} ) => {
    return (
      <div>
        find countries <input value={filterBy}
                                onChange={handleFiltering} />
      </div>
    )
  }

export default Filter