import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

test('<CreateBlogForm /> calls event handler with correct data', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlogForm createBlog={ createBlog } />
  )

  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')
  const form = component.container.querySelector( 'form' )

  fireEvent.change( title, {
    target: { value: 'Jest Test' }
  })

  fireEvent.change( author, {
    target: { value: 'Test Author' }
  })

  fireEvent.change(url, {
    target: { value: 'http://testurl.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Jest Test' )
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author' )
  expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com' )
})