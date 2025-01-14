import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    'title': 'Component testing is done with react-testing-library',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 268,
    'user': {
      'username': 'hellas',
      'name': 'Arto Hellas',
      'id': '5a43e018234ac2c8b9e4e913'
    },
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library Robert C. Martin')
  screen.debug(element)

  expect(element).toBeDefined()

})

test('clicking the button calls event handler once', async () => {
  const blog = {
    'title': 'Component testing is done with react-testing-library',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 268,
    'user': {
      'username': 'hellas',
      'name': 'Arto Hellas',
      'id': '5a43e018234ac2c8b9e4e913'
    },
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})