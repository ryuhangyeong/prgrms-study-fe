class TodoList {
  $target = null
  $todoList = null
  data = null
  onToggle = null
  onRemove = null

  constructor({ $target, initialData = [], onToggle, onRemove }) {
    this.$target = $target
    isValidTodos(initialData)
    this.data = initialData
    this.onToggle = onToggle
    this.onRemove = onRemove

    this.$todoList = document.createElement('ul')
    this.$todoList.className = 'TodoList'
    this.$target.appendChild(this.$todoList)

    this.render()

    this.$todoList.addEventListener('click', (e) => {
      const { target } = e
      const { tagName } = target

      const idx = target.closest('li').dataset.idx

      if (tagName === 'P') this.onToggle(idx)
      else if (tagName === 'BUTTON') this.onRemove(idx)
    })
  }

  setState(nextData) {
    isValidTodos(nextData)
    this.data = nextData
    this.render()
  }

  render() {
    this.$todoList.innerHTML = this.data
      .map(
        ({ text, isCompleted }, idx) => `<li data-idx=${idx}>
        <p class="${isCompleted ? 'completed' : ''}">${text}</p>
        <button>삭제</button>
      </li>`
      )
      .join('')
  }
}
