const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )

blogsRouter.get( '/', async ( request, response ) => {
  const blogs = await Blog.find({})
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

blogsRouter.post( '/', async ( request, response, next ) => {
  const blog = new Blog( request.body )

  if ( blog.title === undefined || blog.url === undefined ) {
    return response.status( 400 ).end()
  }

  if ( blog.likes === undefined ) {
    blog.likes = 0
  }

  try {
    const result = await blog.save()
    response.status( 201 ).json( result )
  } catch ( error ) {
    next( error )
  }
})

blogsRouter.delete( '/:id', async ( request, response ) => {
  await Blog.findByIdAndDelete( request.params.id )
  response.status( 204 ).end()
})

blogsRouter.put( '/:id', async ( request, response, next ) => {
  const blog = new Blog( request.body )

  try {
    const result = await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } )
    response.json( result )
  } catch ( error ) {
    next( error )
  }
})

module.exports = blogsRouter