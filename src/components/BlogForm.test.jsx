import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'


describe('<Blog />', () => {
  const createBlog = vi.fn()

  beforeEach(() => {
    render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('form creates new blog with right values',async () => {

    const user = userEvent.setup()
    const inputBlog = screen.getByPlaceholderText('write blog title here')
    await user.type(inputBlog, 'blog name')
    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    await user.type(inputAuthor, 'author name')
    const inputUrl = screen.getByPlaceholderText('write blog url here')
    await user.type(inputUrl, 'url name')

    const button = screen.getByText('add')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'blog name',
      author: 'author name',
      url: 'url name',
      likes: 0 })
    console.log(createBlog.mock.calls)
  })




})
