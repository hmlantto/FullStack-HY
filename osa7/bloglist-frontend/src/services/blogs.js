import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get( baseUrl )
  return response.data
}

const create = async ( newObject ) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post( baseUrl, newObject, config )
  return response.data
}

const update = async ( id, newObject ) => {
  const url = `${ baseUrl }/${ id }`
  const response = await axios.put( url, newObject )
  return response.data
}

const remove = async ( id ) => {
  const url = `${ baseUrl }/${ id }`
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete( url, config )
  return response.data
}

const addComment = async ( id, newObject ) => {
  const url = `${ baseUrl }/${ id }/comments`
  const response = await axios.post( url, newObject )
  return response.data
}

const blogService = { setToken, getAll, create, update, remove, addComment }

export default blogService