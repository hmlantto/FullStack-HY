const blogsRouter = require( 'express' ).Router()
const Blog = require('../models/blog')

blogsRouter.get( '/', ( request, response, next ) => {
  Blog
    .find({})
    .then( blogs => {
      response.json( blogs )
    })
    .catch(error => next(error))
})

blogsRouter.get( '/:id', ( request, response, next ) => {
  Blog
    .findById( request.params.id )
    .then( blog => {
      response.json( blog )
    })
    .catch(error => next(error))
})

blogsRouter.post( '/', ( request, response, next ) => {
  const blog = new Blog( request.body )

  if ( blog.title === undefined || blog.url === undefined ) {
    return response.status( 400 ).end()
  }

  if ( blog.likes === undefined ) {
    blog.likes = 0
  }

  blog
    .save()
    .then( result => {
      response.status( 201 ).json( result )
    })
    .catch(error => next(error))
})

module.exports = blogsRouter