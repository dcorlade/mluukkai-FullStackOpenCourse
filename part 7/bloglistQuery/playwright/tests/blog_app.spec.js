const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, getLikesCount, updateLike } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'test',
        password: 'user'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to the application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'user')

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrong')

      await expect(page.getByText('Failed to login: incorrect username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'test', 'user')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'a blog created by ', 'playwright', 'https://playwright.dev')
        await expect(page.getByText('a blog created by playwright')).toBeVisible()
      })

      describe('and a blog exists', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'a blog created by ', 'playwright', 'https://playwright.dev')
        })

        test('a blog can be liked', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          const likes = await getLikesCount(page)
          await page.getByRole('button', { name: 'like' }).click()
          const updatedLikes = await getLikesCount(page)
          await expect(updatedLikes).toBe(likes + 1)
        })

        test('a blog can be deleted', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          page.on('dialog', dialog => dialog.accept())
          await page.getByRole('button', { name: 'remove' }).click()
          const notifDiv = await page.locator('.notif')
          await expect(page.getByText('a blog created by playwright')).not.toBeVisible()
          await expect(notifDiv).toHaveText('Removed a blog successfully')
          await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

        })

        test('only the owner can see the remove blog button', async ({ page, request }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

          await request.post('/api/users', {
            data: {
              name: 'Second Test User',
              username: 'secondtest',
              password: 'seconduser'
            }
          })

          await page.getByRole('button', { name: 'logout' }).click()
          loginWith(page, 'secondtest', 'seconduser')

          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are ordered by likes', async ({ page }) => {
          // add 3 more blogs
          await createBlog(page, 'second blog', 'playwright', 'https://playwright.dev')
          await createBlog(page, 'third blog', 'playwright', 'https://playwright.dev')
          await createBlog(page, 'fourth blog', 'playwright', 'https://playwright.dev')
          //add likes to blogs
          const blogLikes = []
          const blogs = await page.getByTestId('blog').all()
          expect(blogs.length).toEqual(4)

          for (const blog of blogs) {
            const likes = await updateLike(blog, Math.floor(Math.random() * 10))
            const blogTitle = await blog.getByTestId('title').innerText()
            blogLikes.push({ blogTitle, likes })
          }

          await page.waitForTimeout(500)

          // sort the blogs by likes
          blogLikes.sort((a, b) => b.likes - a.likes)
          console.log(blogLikes)

          // check if the blogs are sorted in the UI
          const updatedBlogs = await page.getByTestId('blog').all()
          for (const blog of updatedBlogs) {
            const blogTitle = blogLikes.shift().blogTitle
            const actualBlogTitle = await blog.getByTestId('title').innerText()
            const actualBlogLikes = await blog.getByTestId('likes').innerText()
            console.log('blog title: ', actualBlogTitle, actualBlogLikes)
            expect(blogTitle).toEqual(actualBlogTitle)
          }
        })
      })
    })
  })
})