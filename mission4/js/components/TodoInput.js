export default class TodoInput {
  constructor({ $target, initialData = false, onCreate }) {
    this.$target = $target
    this.data = initialData
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

    this.toggleDisabled()
  }

  setState(nextData) {
    this.data = nextData
    this.toggleDisabled()
  }

  toggleDisabled() {
    this.$todoInput.disabled = this.data
  }
}
