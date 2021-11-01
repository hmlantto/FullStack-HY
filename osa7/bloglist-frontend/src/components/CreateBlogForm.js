import React, { useState } from 'react'
import { useDispatch }     from 'react-redux'
import { Button, Form }    from 'react-bootstrap'
import { addBlog }         from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlogForm = ( { blogFormRef } ) => {
  const [ blogTitle,  setBlogTitle  ] = useState( '' )
  const [ blogAuthor, setBlogAuthor ] = useState( '' )
  const [ blogUrl,    setBlogUrl    ] = useState( '' )

  const dispatch = useDispatch()

  const createBlog = async ( event ) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    setBlogTitle( '' )
    setBlogAuthor( '' )
    setBlogUrl( '' )

    try {
      dispatch( addBlog( blogObject ) )
      blogFormRef.current.toggleVisibility()
      dispatch( setNotification( `a new blog ${ blogObject.title } by ${ blogObject.author } added`, 'notification', 5 ) )
    } catch ( exception ) {
      console.log( exception.message )
      dispatch( setNotification( exception.message, 'error', 5 ) )
    }
  }

  return (
    <div>
      <h2>Create New</h2>

      <Form onSubmit={ createBlog }>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={ blogTitle }
            name="title"
            onChange={({ target }) => setBlogTitle( target.value )}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={ blogAuthor }
            name="author"
            onChange={({ target }) => setBlogAuthor( target.value )}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            value={ blogUrl }
            name="url"
            onChange={({ target }) => setBlogUrl( target.value )}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default CreateBlogForm