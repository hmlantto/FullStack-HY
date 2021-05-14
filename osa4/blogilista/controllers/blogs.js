const jwt = require( 'jsonwebtoken' )
const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )
const User = require( '../models/user' )

const getTokenFrom = request => {
  const authorization = request.get( 'authorization' )
  if ( authorization && authorization.toLowerCase().startsWith( 'bearer ' ) ) {
    return authorization.substring( 7 )
  }
  return null
}

blogsRouter.get( '/', async ( request, response ) => {
  const blogs = await Blog
    .find({}).populate( 'user', { username: 1, name: 1, id: 1 } )

  response.json( blogs )
})

blogsRouter.get( '/:id', async ( request, response ) => {
  const blog = await Blog.findById( request.params.id )

  if ( blog ) {
    response.json( blog )
  } else {
    response.status( 404 ).end()
  }
})

blogsRouter.post( '/', async ( request, response ) => {
  const blog = new Blog( request.body )

  if ( blog.title === undefined || blog.url === undefined ) {
    return response.status( 400 ).end()
  }

  const token = getTokenFrom( request )
  if ( !token ) {
    return response.status( 401 ).json( { error: 'token missing' } )
  }

  const decodedToken = jwt.verify( token, process.env.SECRET )
  if ( !decodedToken.id ) {
    return response.status( 401 ).json( { error: 'token invalid' } )
  }

  const user = await User.findById( decodedToken.id )
  blog.user = user._id

  if ( blog.likes === undefined ) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat( savedBlog._id )
  user.save()

  response.status( 201 ).json( savedBlog )
})

blogsRouter.delete( '/:id', async ( request, response ) => {
  await Blog.findByIdAndDelete( request.params.id )
  response.status( 204 ).end()
})

blogsRouter.put( '/:id', async ( request, response ) => {
  const blog = new Blog( request.body )

  const result = await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } )
  response.json( result )
})

module.exports = blogsRouter