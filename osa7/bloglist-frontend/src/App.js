import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [ blogs, setBlogs ] = useState( [] )

  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ user, setUser ] = useState( null )

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const compareByLikesDescending = function ( blog1, blog2 ) {
    if ( blog2.likes !== blog1.likes ) {
      return blog2.likes - blog1.likes
    }

    if ( blog1.title.toUpperCase() > blog2.title.toUpperCase() ) {
      return 1
    }

    return -1
  }

  useEffect(() => {
    blogService.getAll().then( allBlogs =>
      setBlogs( allBlogs.sort( compareByLikesDescending ) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if ( loggedUserJSON ) {
      const user = JSON.parse( loggedUserJSON )
      setUser( user )
      blogService.setToken( user.token )
    }
  }, [])

  const handleLogin = async ( event ) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify( user )
      )
      blogService.setToken( user.token )

      setUser( user )
      setUsername( '' )
      setPassword( '' )

    } catch ( exception ) {
      dispatch( setNotification( 'wrong username or password', 'error', 5 ) )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser( null )
  }

  const createBlog = async ( blogObject ) => {
    try {
      const newBlog = await blogService.create( blogObject )
      setBlogs( blogs.concat( newBlog ) )
      blogFormRef.current.toggleVisibility()

      dispatch( setNotification( `a new blog ${newBlog.title} by ${newBlog.author} added`, 'notification', 30 ) )
    } catch ( exception ) {
      dispatch( setNotification( exception.message, 'error', 5 ) )
    }
  }

  const onBlogLiked = async ( id, blogObject ) => {
    try {
      await blogService.update( id, blogObject )
      const updatedBlogs = blogs.map( blog => blog.id === id ? { ...blog, likes: blog.likes+1 } : blog )
      setBlogs( updatedBlogs.sort( compareByLikesDescending ) )

    } catch ( exception ) {
      console.log( exception.message )
    }
  }

  const onBlogDeleted = ( id ) => {
    setBlogs( blogs.filter( blog => blog.id !== id ) )
  }

  if ( user === null ) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />
        <form onSubmit={ handleLogin }>
          <div>
          username
            <input  type="text"
              value={ username }
              name="Username"
              id="username"
              onChange={({ target }) => setUsername( target.value )}
            />
          </div>
          <div>
          password
            <input  type="password"
              value={ password }
              name="Password"
              id="password"
              onChange={({ target }) => setPassword( target.value )}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        { user.name } logged in
        <button type="button" onClick={ handleLogout }>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={ blogFormRef }>
        <CreateBlogForm createBlog={ createBlog }/>
      </Togglable>

      {blogs.map( blog =>
        <Blog
          key={ blog.id }
          blog={ blog }
          user={ user }
          onBlogLiked={ onBlogLiked }
          onBlogDeleted={ onBlogDeleted } />
      )}
    </div>
  )
}

export default App