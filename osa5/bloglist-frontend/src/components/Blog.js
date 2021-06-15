import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [ showAll, setShowAll ] = useState( false )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAll( !showAll )
  }

  if ( showAll === false ) {
    return (
      <div style={ blogStyle }>
        { blog.title } { blog.author } <button onClick={ toggleVisibility }>view</button>
      </div>  
    )
  }

  return (
    <div style={ blogStyle }>
      { blog.title } { blog.author } <button onClick={ toggleVisibility }>hide</button><br />
      { blog.url }<br />
      likes { blog.likes } <button>like</button><br />
      { blog.user.name }
    </div>  
  )
}

export default Blog