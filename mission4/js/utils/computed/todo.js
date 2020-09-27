const getTodoStatus = (todos) => ({
  all: todos.length,
  completed: todos.filter((t) => t.isCompleted).length,
})

export { getTodoStatus }
