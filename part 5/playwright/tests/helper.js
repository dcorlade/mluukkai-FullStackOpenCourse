const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('blog-title').fill(title)
  await page.getByTestId('blog-author').fill(author)
  await page.getByTestId('blog-url').fill(url)
  await page.getByRole('button', { name: 'add' }).click()

  await page.waitForTimeout(500)
}

const getLikesCount = async (page) => {
  const likesText = await page.getByTestId('likes').innerText()
  return parseInt(likesText.match(/\d+/)[0])
}

const updateLike = async (page, numberOfLikes) => {
  await page.getByRole('button', { name: 'view' }).click()
  const initialLikes = await getLikesCount(page)
  console.log(`Initial likes for ${await page.getByTestId('title').innerText()}: ${initialLikes}`)

  // Increment likes
  for (let i = 0; i < numberOfLikes; i++) {
    await page.getByRole('button', { name: 'like' }).click()
  }

  const updatedLikes = await getLikesCount(page)
  console.log(`Updated likes for ${await page.getByTestId('title').innerText()}: ${updatedLikes}`)

  return updatedLikes
}

export { loginWith, createBlog, getLikesCount, updateLike }