import React, { useState }          from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory }    from 'react-router-dom'
import { Button, Form, Row, Col }   from 'react-bootstrap'

import { likeBlog, deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification }                     from '../reducers/notificationReducer'

const Blog = ( { user } ) => {
  const [ comment, setComment ] = useState( '' )

  const id       = useParams().id
  const blog     = useSelector( state => state.blogs ).find( n => n.id === id )
  const dispatch = useDispatch()
  const history  = useHistory()

  if ( !blog || !user ) {
    return null
  }

  const hideDeleteButton = { display: blog.user.username === user.username ? '' : 'none' }

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
      dispatch( likeBlog( id, blogObject ) )
    } catch ( exception ) {
      console.log( exception.message )
    }
  }

  const removeBlog = async ( event ) => {
    event.preventDefault()

    if ( window.confirm( `Remove blog ${ blog.title } by ${ blog.author }?` ) ) {
      try {
        dispatch( deleteBlog( id ) )
        history.push ( '/' )
      } catch( exception ) {
        console.log( exception.message )
      }
    }
  }

  const addComment = async ( event ) => {
    event.preventDefault()

    const commentObject = {
      content: comment
    }

    setComment( '' )

    try {
      dispatch( createComment( id, commentObject ) )
    } catch ( exception ) {
      console.log( exception.message )
      dispatch( setNotification( exception.message, 'error', 5 ) )
    }
  }

  return (
    <div>
      <h2>{ blog.title } by { blog.author }</h2>
      <p>
        { blog.url }<br />
        { blog.likes } likes <Button variant="outline-primary" size="sm" className="small-button" type="button" onClick={ addLike }>like</Button><br />
        added by { blog.user.name }
        <span style={ hideDeleteButton }>
          <br />
          <Button variant="danger" size="sm" type="button" onClick={ removeBlog }>remove</Button>
        </span>
      </p>

      <h3>Comments</h3>

      <Form onSubmit={ addComment }>
        <Row>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              value={ comment }
              name="comment-content"
              placeholder="Add new comment"
              onChange={({ target }) => setComment( target.value )}
            />
          </Col>
          <Col>
            <Button variant="primary" size="sm" type="submit">Create</Button>
          </Col>
        </Row>
      </Form>

      <ul style={ { marginTop: '1rem' } }>
        { blog.comments.map( comment =>
          <li key={ comment.id }>
            { comment.content }
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blog