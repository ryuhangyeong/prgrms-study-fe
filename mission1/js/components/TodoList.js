class TodoList {
  $target = null
  $todoList = null
  data = null

  constructor({ $target, initialData = [] }) {
    this.$target = $target
    this.isValidData(initialData)
    this.data = initialData

    this.$todoList = document.createElement('ul')
    this.$target.appendChild(this.$todoList)

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  isValidData(data) {
    if (
      data.some(
        ({ text, isCompleted }) =>
          !!!text ||
          typeof text !== 'string' ||
          isCompleted === undefined ||
          typeof isCompleted !== 'boolean'
      )
    ) {
      throw new Error('awrong todo data')
    }
  }

  render() {
    this.$todoList.innerHTML = this.data
      .map(
        ({ text, isCompleted }) => `<li>
			${isCompleted ? `<s>${text}</s>` : text}
		</li>`
      )
      .join('')
  }
}
