class App {
  $target = null
  todos = store.get('todos') || []
  todoAllRemoveBtn = null
  todoInput = null
  todoList = null
  todoCount = null

  constructor($target) {
    this.$target = $target

    this.todoAllRemoveBtn = new TodoAllRemoveBtn({
      $target,
    })

    this.todoInput = new TodoInput({
      $target,
      onCreate: (text) => {
        this.todos = [{ text, isCompleted: false }, ...this.todos]
        this.setState(this.todos)
      },
    })

    this.todoList = new TodoList({
      $target,
      initialData: this.todos,
      onToggle: (idx) => {
        this.todos[idx].isCompleted = !this.todos[idx].isCompleted
        this.setState(this.todos)
      },
      onRemove: (idx) => {
        this.todos.splice(idx, 1)
        this.setState(this.todos)
      },
    })

    this.todoCount = new TodoCount({
      $target,
      initialData: getTodoStatus(this.todos),
    })

    this.subscribe()
  }

  subscribe() {
    this.todoAllRemoveBtn.$todoAllRemoveBtn.addEventListener(
      'removeAll',
      () => {
        this.todos = []
        this.setState(this.todos)
      }
    )
  }

  setState(nextData) {
    isValidTodos(nextData)
    this.todos = nextData
    this.todoList.setState(this.todos)
    this.todoCount.setState(getTodoStatus(this.todos))
    store.set('todos', this.todos)
  }
}
