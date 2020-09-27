class TodoInput {
  $target = null
  $todoInput = null
  onCreate = null

  constructor({ $target, onCreate }) {
    this.$target = $target
    this.onCreate = onCreate

    this.$todoInput = document.createElement('input')
    this.$todoInput.placeholder = '할일을 추가하세요'
    this.$todoInput.autofocus = true
    this.$target.appendChild(this.$todoInput)

    this.$todoInput.addEventListener('keyup', (e) => {
      const { target, key } = e
      const { value } = target
      if (!value) return

      if (key === 'Enter') {
        target.value = ''
        this.onCreate(value)
      }
    })
  }
}
