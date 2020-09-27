import { isValidTodos } from '../utils/validate.js'

export default class TodoList {
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
      const {
        target,
        target: { tagName },
      } = e

      const id = target.closest('li').dataset.id

      if (tagName === 'P') this.onToggle(id)
      else if (tagName === 'BUTTON') this.onRemove(id)
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
        ({ content, isCompleted, _id }) => `<li data-id=${_id}>
        <p class="${isCompleted ? 'completed' : ''}">${content}</p>
        <button>삭제</button>
      </li>`
      )
      .join('')
  }
}
