const { test, expect, beforeEach, describe } = require('@playwright/test')


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
      await page.fill('[data-testid=username]', 'test')
      await page.fill('[data-testid=password]', 'user')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('[data-testid=username]', 'test')
      await page.fill('[data-testid=password]', 'wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Failed to login: incorrect username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('test')
        await page.getByTestId('password').fill('user')
        await page.getByRole('button', { name: 'login' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('blog-title').fill('a blog created by ')
        await page.getByTestId('blog-author').fill('playwright')
        await page.getByTestId('blog-url').fill('https://playwright.dev')
        await page.getByRole('button', { name: 'add' }).click()
        await expect(page.getByText('a blog created by playwright')).toBeVisible()
      })

      describe('and a blog exists', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await page.getByTestId('blog-title').fill('a blog created by ')
          await page.getByTestId('blog-author').fill('playwright')
          await page.getByTestId('blog-url').fill('https://playwright.dev')
          await page.getByRole('button', { name: 'add' }).click()
        })

        const getLikesCount = async (page) => {
          const likesText = await page.getByTestId('likes').innerText()
          return parseInt(likesText.match(/\d+/)[0])
        }

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
          await page.getByTestId('username').fill('secondtest')
          await page.getByTestId('password').fill('seconduser')
          await page.getByRole('button', { name: 'login' }).click()

          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
      })
    })
  })
})