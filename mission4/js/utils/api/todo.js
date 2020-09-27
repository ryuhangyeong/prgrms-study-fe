import request from './request.js'

const END_POINT = 'https://todo-api.roto.codes'

export const getTodoList = ({ username, delay = 0 }) =>
  request(`${END_POINT}/${username}/?delay=${delay}`)

export const createTodo = ({ username, content, delay = 0 }) =>
  request(`${END_POINT}/${username}/?delay=${delay}`, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
  })

export const removeTodo = ({ username, _id }) =>
  request(`${END_POINT}/${username}/${_id}`, {
    method: 'DELETE',
  })

export const toggleCompletedTodo = ({ username, _id }) =>
  request(`${END_POINT}/${username}/${_id}/toggle`, {
    method: 'PUT',
  })

export const getUserList = () => request(`${END_POINT}/users`)
