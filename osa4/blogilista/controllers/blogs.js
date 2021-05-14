const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )
const User = require( '../models/user' )

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

  if ( blog.likes === undefined ) {
    blog.likes = 0
  }

  const user = await User.findOne()
  blog.user = user._id

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