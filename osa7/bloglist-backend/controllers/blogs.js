const { tokenExtractor, userExtractor } = require('../utils/middleware')
const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )
const Comment = require( '../models/comment' )

blogsRouter.get( '/', async ( request, response ) => {
  const blogs = await Blog
    .find({}).populate( 'user', { username: 1, name: 1, id: 1 } ).populate( 'comments', { content: 1, id: 1 } )

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

blogsRouter.post( '/', tokenExtractor, userExtractor, async ( request, response ) => {
  const blog = new Blog( request.body )

  if ( blog.title === undefined || blog.url === undefined ) {
    return response.status( 400 ).end()
  }

  blog.user = request.user._id

  if ( blog.likes === undefined ) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat( savedBlog._id )
  request.user.save()

  response.status( 201 ).json( savedBlog )
})

blogsRouter.delete( '/:id', tokenExtractor, userExtractor, async ( request, response ) => {
  if ( request.user._id.toString() !== request.token.id ) {
    return response.status( 401 ).json( { error: 'not authorized' } )
  }

  await Blog.findByIdAndDelete( request.params.id )
  request.user.blogs = request.user.blogs.filter( x => x.id !== request.params.id )
  request.user.save()

  await Comment.deleteMany( { blog: `${ request.params.id }` } )

  response.status( 204 ).end()
})

blogsRouter.put( '/:id', async ( request, response ) => {
  const blog = request.body
  const result = await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } )
  response.json( result.toJSON() )
})

blogsRouter.post( '/:id/comments', async ( request, response ) => {
  const comment = new Comment({
    content: request.body.content,
    blog: request.params.id
  })

  let blog = await Blog.findById( request.params.id )
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat( savedComment._id )
  await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } )

  response.status( 201 ).json( savedComment )
})

module.exports = blogsRouter