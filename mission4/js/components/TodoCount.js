export default class TodoCount {
  constructor({ $target, initialData = { all: 0, completed: 0 } }) {
    this.$target = $target
    this.data = initialData

    this.$todoCount = document.createElement('div')
    this.$target.appendChild(this.$todoCount)

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    this.$todoCount.innerHTML = `
      <p>총 Todo의 갯수: ${this.data.all}</p>
      <p>완료처리된 Todo의 갯수: ${this.data.completed}</p>
    `
  }
}
