import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    id: '609e599efba83c1a006661c4',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.com/',
    user: '609e84e8f2b1122cf0f10ceb',
    likes: 6
  }

  const user = {
    id: '609cfdf3eacc1509d892b37a',
    username: 'mchan',
    name: 'Michael Chan',
    passwordHash: '$2b$10$JcSmKniC/x0xcO9uhu//IO/QSDSD.mjhk/XRo5S6xt0XYte8HsRG6',
    blogs: [ '60c74768492e02006c832882', '60c74de4492e02006c832883', '60c9bd35d61d6d23acf4e5c0' ]
  }

  const mockBlogLiked = jest.fn()
  const mockBlogDeleted = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog key={ blog.id } blog={ blog } user={ user } onBlogLiked={ mockBlogLiked } onBlogDeleted={ mockBlogDeleted } />
    )
  })

  describe('initially', () => {
    test('renders title', () => {
      expect( component.container ).toHaveTextContent( 'Test Blog' )
    })

    test('renders author', () => {
      expect( component.container ).toHaveTextContent( 'Test Author' )
    })

    test('does not render url', () => {
      expect( component.container ).not.toHaveTextContent( 'https://testurl.com/' )
    })

    test('does not render likes', () => {
      expect( component.container ).not.toHaveTextContent( 'likes' )
    })
  })

  describe('after clicking view', () => {
    beforeEach(() => {
      const button = component.getByText( 'view' )
      fireEvent.click( button )
    })

    test('renders title', () => {
      expect( component.container ).toHaveTextContent( 'Test Blog' )
    })

    test('renders author', () => {
      expect( component.container ).toHaveTextContent( 'Test Author' )
    })

    test('renders url', () => {
      expect( component.container ).toHaveTextContent( 'https://testurl.com/' )
    })

    test('renders likes', () => {
      expect( component.container ).toHaveTextContent( 'likes' )
    })
  })

  test('when like is clicked twice, event handler is also called twice', () => {
    const viewButton = component.getByText( 'view' )
    fireEvent.click( viewButton )

    const likeButton = component.getByText( 'like' )
    fireEvent.click( likeButton )
    fireEvent.click( likeButton )

    expect( mockBlogLiked ).toHaveBeenCalledTimes( 2 )
  })

})