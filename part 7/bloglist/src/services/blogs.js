import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const create = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error creating data:', error)
    throw error
  }
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

const createComment = async (id, comment) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const newObject = { comment: comment }
    const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error adding comment:', error)
    throw error
  }
}

export default { getAll, setToken, create, update, remove, createComment }
