export default class UserName {
  constructor({ $target, initialData = '' }) {
    this.$target = $target
    this.data = initialData

    this.$userName = document.createElement('h1')
    this.$target.appendChild(this.$userName)

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    this.$userName.innerText = `${this.data}`
  }
}
