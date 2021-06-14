import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState( [] )
  
  const [ username, setUsername ] = useState( '' ) 
  const [ password, setPassword ] = useState( '' )
  const [ user, setUser ] = useState( null )

  const [ blogTitle, setBlogTitle ] = useState( '' )
  const [ blogAuthor, setBlogAuthor ] = useState( '' )
  const [ blogUrl, setBlogUrl ] = useState( '' )

  useEffect(() => {
    blogService.getAll().then( blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if ( loggedUserJSON ) {
      const user = JSON.parse( loggedUserJSON )
      setUser( user )
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
      console.log( 'Login failed.' )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser( null )
  }

  const handleCreateBlog = async ( event ) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      const newBlog = await blogService.create( blogObject )
      setBlogs( blogs.concat( newBlog ) )
      setBlogTitle( '' )
      setBlogAuthor( '' )
      setBlogUrl( '' )

    } catch ( exception ) {
      console.log( 'Something went wrong.' )
    }

  }

  if ( user === null ) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={ handleLogin }>
        <div>
          username
            <input  type="text"
                    value={ username }
                    name="Username"
                    onChange={({ target }) => setUsername( target.value )}
          />
        </div>
        <div>
          password
            <input  type="password"
                    value={ password }
                    name="Password"
                    onChange={({ target }) => setPassword( target.value )}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>
        { user.name } logged in
        <button type="button" onClick={ handleLogout }>logout</button>
      </p>

      <h2>create new</h2>

      <form onSubmit={ handleCreateBlog }>
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

        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App