import React, { useRef } from 'react'
import { useSelector }   from 'react-redux'
import { Link }          from 'react-router-dom'
import { Table }         from 'react-bootstrap'
import CreateBlogForm    from './CreateBlogForm'
import Togglable         from './Togglable'

const Blogs = () => {
  const blogs       = useSelector( state => state.blogs )
  const blogFormRef = useRef()

  return(
    <>
      <h2>Blogs</h2>

      <Togglable buttonLabel='create new blog' ref={ blogFormRef }>
        <CreateBlogForm blogFormRef={ blogFormRef }/>
      </Togglable>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Blog name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          { blogs.map( blog =>
            <tr key={blog.id}>
              <td><Link to={ `/blogs/${ blog.id }` }>{ blog.title }</Link></td>
              <td>{ blog.author }</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default Blogs