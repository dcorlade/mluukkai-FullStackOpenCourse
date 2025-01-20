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
    })
  })
})