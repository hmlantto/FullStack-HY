import React, { useState } from 'react'

const CreateBlogForm = ( props ) => {
  const { createBlog } = props

  const [ blogTitle, setBlogTitle ] = useState( '' )
  const [ blogAuthor, setBlogAuthor ] = useState( '' )
  const [ blogUrl, setBlogUrl ] = useState( '' )

  const addBlog = ( event ) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    
    createBlog( blogObject )
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={ addBlog }>
      <div>
          title:
            <input  type="text"
                    value={ blogTitle }
                    name="title"
                    onChange={({ target }) => setBlogTitle( target.value )}
          />
        </div>
        <div>
          author:
            <input  type="text"
                    value={ blogAuthor }
                    name="author"
                    onChange={({ target }) => setBlogAuthor( target.value )}
          />
        </div>
        <div>
          url:
            <input  type="text"
                    value={ blogUrl }
                    name="url"
                    onChange={({ target }) => setBlogUrl( target.value )}
          />
        </div>
        <button type="submit">create</button>
        </form>
    </div>
  )
}

export default CreateBlogForm