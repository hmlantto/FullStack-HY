import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ( props ) => {
  const { blog, onBlogLiked } = props

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

  const addLike = async ( event ) => {
    event.preventDefault()

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1),
      user: blog.user.id
    }

    try {
      const updatedBlog = await blogService.update( blog.id, blogObject )
      onBlogLiked( updatedBlog.id )

    } catch ( exception ) {
      console.log( exception.message )
    }
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
      likes { blog.likes } <button onClick={ addLike }>like</button><br />
      { blog.user.name }
    </div>  
  )
}

export default Blog