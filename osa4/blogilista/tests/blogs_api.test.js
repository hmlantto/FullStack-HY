const mongoose = require( 'mongoose' )
const supertest = require( 'supertest' )
const helper = require( './test_helper' )
const app = require( '../app' )
const api = supertest( app )
const Blog = require( '../models/blog' )
const blog = require('../models/blog')

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany( helper.initialBlogs )
})

test( 'GET returns correct number of notes', async () => {
  const response = await api.get( '/api/blogs' )
  expect( response.body ).toHaveLength( helper.initialBlogs.length )
})

test( 'field id exists', async () => {
  const response = await api.get( '/api/blogs' )
  expect( response.body[0].id ).toBeDefined()
})

test( 'blog can be added to database', async () => {
  const newBlog = {
    _id: '6093e985ada165582b92d674',
    title: 'Cashmerette Blog',
    author: 'Cashmerette',
    url: 'https://blog.cashmerette.com/',
    likes: 5,
    __v: 0
  }

  await api
    .post( '/api/blogs' )
    .send( newBlog )
    .expect( 201 )
    .expect( 'Content-Type', /application\/json/ )

  const blogsAtEnd = await helper.blogsInDb()
  expect( blogsAtEnd ).toHaveLength( helper.initialBlogs.length + 1 )
  const ids = blogsAtEnd.map( b => b.id )
  expect( ids ).toContain( newBlog._id )
})

afterAll(() => {
  mongoose.connection.close()
})