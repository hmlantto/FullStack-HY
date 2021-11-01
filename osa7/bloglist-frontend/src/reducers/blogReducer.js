import blogService from '../services/blogs'

const compareByLikesDescending = function ( blog1, blog2 ) {
  if ( blog2.likes !== blog1.likes ) {
    return blog2.likes - blog1.likes
  }

  if ( blog1.title.toUpperCase() > blog2.title.toUpperCase() ) {
    return 1
  }

  return -1
}

const blogReducer = ( state = [], action ) => {
  switch ( action.type ) {
    case 'ADD_BLOG':
      return [ ...state, action.data ]
    case 'LIKE_BLOG': {
      const updatedBlogs = state.map( blog => blog.id === action.id ? { ...blog, likes: blog.likes+1 } : blog )
      const sortedBlogs  = updatedBlogs.sort( compareByLikesDescending )
      return sortedBlogs
    }
    case 'INIT_BLOGS': {
      const sortedBlogs = action.data.sort( compareByLikesDescending )
      return sortedBlogs
    }
    case 'DELETE_BLOG':
      return state.filter( blog => blog.id !== action.id )
    case 'ADD_COMMENT': {
      const updatedBlogs = state.map( blog => blog.id === action.newComment.blog ? { ...blog, comments: [ ...blog.comments, action.newComment ] } : blog )
      const sortedBlogs  = updatedBlogs.sort( compareByLikesDescending )
      return sortedBlogs
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = ( blogObject ) => {
  return async dispatch => {
    const newBlog = await blogService.create( blogObject )
    dispatch ({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = ( id, blogObject ) => {
  return async dispatch => {
    await blogService.update( id, blogObject )
    dispatch ({
      type: 'LIKE_BLOG',
      id
    })
  }
}

export const deleteBlog = ( id ) => {
  return async dispatch => {
    await blogService.remove( id )
    dispatch ({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const createComment = ( id, commentObject ) => {
  return async dispatch => {
    const newComment = await blogService.addComment( id, commentObject )
    dispatch ({
      type: 'ADD_COMMENT',
      newComment
    })
  }
}

export default blogReducer