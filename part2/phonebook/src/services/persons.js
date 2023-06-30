import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAllEntries = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createEntry = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const updateEntry = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(response => response.data)
}

const deleteEntry = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
}

export default {
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry,
}
