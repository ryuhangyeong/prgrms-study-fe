import {
  TodoCount,
  TodoInput,
  TodoList,
  UserList,
  UserName,
  Loading,
} from './components/index.js'

import {
  getTodoList,
  createTodo,
  removeTodo,
  toggleCompletedTodo,
  getUserList,
} from './utils/api/todo.js'

import { isValidTodos } from './utils/validate.js'
import { getTodoStatus } from './utils/computed/todo.js'
import { wrapError, wrapLoading } from './utils/etc/wrapper.js'

export default class App {
  state = {
    username: 'ryuhangyeong',
    todos: [],
    users: [],
    isLoading: false,
  }

  constructor($target) {
    this.willMount($target)
  }

  async willMount($target) {
    this.loading = new Loading({
      $target,
      initialData: this.state.isLoading,
    })

    wrapLoading(async () => {
      this.state.todos = await getTodoList({
        username: this.username,
        delay: 1000,
      })

      this.users = await getUserList()

      this.userList = new UserList({
        $target,
        initialData: this.users,
        onSearch: (username) =>
          wrapLoading(async () => {
            this.state.username = username
            this.state.todos = await getTodoList({
              username: this.state.username,
            })
            this.setState(this.state.todos)
            this.userName.setState(this.state.username)
          }, this.loading),
      })

      this.userName = new UserName({
        $target,
        initialData: this.state.username,
      })

      this.todoInput = new TodoInput({
        $target,
        onCreate: (value) =>
          wrapLoading(async () => {
            this.state.isLoading = true
            this.todoInput.setState(this.state.isLoading)

            const data = await createTodo({
              username: this.state.username,
              content: value,
              delay: 2000,
            })

            this.state.isLoading = false
            this.todoInput.setState(this.state.isLoading)

            const { id: _id, content, isCompleted } = data

            this.state.todos = [
              ...this.state.todos,
              { _id, content, isCompleted },
            ]
            this.setState(this.state.todos)
          }, this.loading),
      })

      this.todoList = new TodoList({
        $target,
        initialData: this.state.todos,
        onToggle: (_id) =>
          wrapError(async () => {
            await toggleCompletedTodo({ username: this.state.username, _id })
            const idx = this.state.todos.findIndex((todo) => todo._id === _id)

            this.state.todos[idx].isCompleted = !this.state.todos[idx]
              .isCompleted
            this.setState(this.state.todos)
          }),
        onRemove: (_id) =>
          wrapError(async () => {
            await removeTodo({ username: this.state.username, _id })

            this.state.todos = this.state.todos.filter(
              (todo) => todo._id !== _id
            )
            this.setState(this.state.todos)
          }),
      })

      this.todoCount = new TodoCount({
        $target,
        initialData: getTodoStatus(this.state.todos),
      })
    }, this.loading)
  }

  setState(nextData) {
    wrapLoading(() => {
      isValidTodos(nextData)
      this.state.todos = nextData
      this.todoList.setState(this.state.todos)
      this.todoCount.setState(getTodoStatus(this.state.todos))
    }, this.loading)
  }
}
