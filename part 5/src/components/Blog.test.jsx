import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'


describe('<Blog />', () => {
  const mockHandler = vi.fn()

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


  beforeEach(() => {
    render(
      <Blog blog={blog} updateBlog={mockHandler}/>
    )
  })

  test('renders content', () => {
    const element = screen.getByText('Component testing is done with react-testing-library Robert C. Martin')

    expect(element).toBeDefined()

  })


  test('renders title and author but not likes or url by default', async () => {
    // Check that the title and author are rendered
    const titleAuthor = screen.getByText('Component testing is done with react-testing-library Robert C. Martin')
    expect(titleAuthor).toBeDefined()

    // Check that the URL is not rendered initially
    const url = screen.queryByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    expect(url).toBeNull()

    // Check that likes are not rendered initially
    const likes = screen.queryByText('likes 268')
    expect(likes).toBeNull()
  })

  test('renders likes or url after clicking view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.queryByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    expect(url).toBeDefined()

    const likes = screen.queryByText('likes 268')
    expect(likes).toBeDefined()
  })

  test('likes button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
