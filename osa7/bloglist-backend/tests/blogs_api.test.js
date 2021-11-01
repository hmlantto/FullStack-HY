const mongoose = require( 'mongoose' )
const supertest = require( 'supertest' )
const helper = require( './test_helper' )
const app = require( '../app' )
const api = supertest( app )
const jwt = require('jsonwebtoken')
const Blog = require( '../models/blog' )
const User = require( '../models/user' )

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany( helper.initialBlogs )

  await User.deleteMany({})
  const initialUser = await helper.getInitialUser()
  await initialUser.save()
})

describe( 'when testing blogsRouter', () => {
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

    const token = jwt.sign( helper.userForToken, process.env.SECRET )

    await api
      .post( '/api/blogs' )
      .set('Authorization', 'bearer ' + token )
      .send( newBlog )
      .expect( 201 )
      .expect( 'Content-Type', /application\/json/ )

    const blogsAtEnd = await helper.blogsInDb()
    expect( blogsAtEnd ).toHaveLength( helper.initialBlogs.length + 1 )
    const ids = blogsAtEnd.map( b => b.id )
    expect( ids ).toContain( newBlog._id )
  })

  test( 'uninitialized likes field is set to 0', async () => {
    const newBlog = {
      _id: '6093e985ada165582b92d675',
      title: 'Muna and Broad Blog',
      author: 'Muna and Broad',
      url: 'https://www.munaandbroad.com/blogs/news',
      likes: 0,
      __v: 0
    }

    const token = jwt.sign( helper.userForToken, process.env.SECRET )

    await api
      .post( '/api/blogs' )
      .set('Authorization', 'bearer ' + token )
      .send( newBlog )
      .expect( 201 )

    const response = await api.get( `/api/blogs/${newBlog._id}` )
    expect( response.body.likes ).toBe( 0 )
  })

  describe( 'return 400 Bad Request', () => {
    test( 'when title not set', async () => {
      const newBlog = {
        _id: '6093e985ada165582b92d676',
        author: 'Megan Nielsen Patterns',
        url: 'https://blog.megannielsen.com/',
        likes: 0,
        __v: 0
      }

      const token = jwt.sign( helper.userForToken, process.env.SECRET )

      await api
        .post( '/api/blogs' )
        .send( newBlog )
        .set('Authorization', 'bearer ' + token )
        .expect( 400 )
    })

    test( 'when url not set', async () => {
      const newBlog = {
        _id: '6093e985ada165582b92d677',
        title: 'Megan Nielsen: the Blog',
        author: 'Megan Nielsen Patterns',
        __v: 0
      }

      const token = jwt.sign( helper.userForToken, process.env.SECRET )

      await api
        .post( '/api/blogs' )
        .send( newBlog )
        .set('Authorization', 'bearer ' + token )
        .expect( 400 )
    })
  })

  test( 'removing blog by id is successful', async () => {
    const idToRemove = '5a422bc61b54a676234d17fc'
    const token = jwt.sign( helper.userForToken, process.env.SECRET )

    await api
      .delete( `/api/blogs/${idToRemove}` )
      .set('Authorization', 'bearer ' + token )
      .expect( 204 )

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map( b => b.id )
    expect( ids ).not.toContain( idToRemove )

    const userId = '60a22c0b47b42e0ba476b7a2'
    const user = await api.get( `/api/users/${userId}` )
    expect( user.body.blogs ).not.toContain( idToRemove )
  })

  test( 'modifying blog is successful', async () => {
    const blogToModify = {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 2,
      __v: 0
    }

    await api
      .put( `/api/blogs/${blogToModify._id}` )
      .send( blogToModify )
      .expect( 200 )

    const response = await api.get( `/api/blogs/${blogToModify._id}` )
    expect( response.body.likes ).toBe( 2 )
  })

  test( 'adding blog without token returns 401 Unauthorized', async () => {
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
      .expect( 401 )
  })
})

describe( 'when testing usersRouter', () => {
  describe( 'return 400 Bad Request', () => {
    test( 'when username not set', async () => {
      const newUser = {
        name: 'Robert C. Martin',
        password: 'testpassword',
      }

      await api
        .post( '/api/users' )
        .send( newUser )
        .expect( 400 )
    })

    test( 'when username too short', async () => {
      const newUser = {
        username: 'rc',
        name: 'Robert C. Martin',
        password: 'testpassword',
      }

      await api
        .post( '/api/users' )
        .send( newUser )
        .expect( 400 )
    })

    test( 'when username not unique', async () => {
      const newUser = {
        username: 'mchan',
        name: 'Robert C. Martin',
        password: 'testpassword',
      }

      await api
        .post( '/api/users' )
        .send( newUser )
        .expect( 400 )
    })

    test( 'when password not set', async () => {
      const newUser = {
        username: 'rcmartin',
        name: 'Robert C. Martin',
      }

      await api
        .post( '/api/users' )
        .send( newUser )
        .expect( 400 )
    })

    test( 'when password too short', async () => {
      const newUser = {
        username: 'rcmartin',
        name: 'Robert C. Martin',
        password: 'pw',
      }

      await api
        .post( '/api/users' )
        .send( newUser )
        .expect( 400 )
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})