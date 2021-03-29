import React   from 'react'

const Filter = ( {filterBy, handleFiltering} ) => {
    return (
      <div>
        Filter contacts: <input value={filterBy}
                                onChange={handleFiltering} />
      </div>
    )
  }

export default Filter