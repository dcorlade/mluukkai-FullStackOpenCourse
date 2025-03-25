import axios from 'axios'
const baseUrl = '/api/orders'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const get = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const add = async (productId, quantity) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, { productId, quantity }, config)
  return response.data
}

const update = async (productId, quantity) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${productId}`, { quantity }, config)
  return response.data
}

const remove = async (productId) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${productId}`, config)
}

export default { get, add, update, remove, setToken }
