export default class UserList {
  constructor({ $target, initialData = [], onSearch }) {
    this.$target = $target
    this.data = initialData
    this.onSearch = onSearch

    this.$wrap = document.createElement('section')
    this.$wrap.className = 'UserList'

    this.$userList = document.createElement('ul')

    this.$wrap.appendChild(this.$userList)
    this.$target.appendChild(this.$wrap)

    this.render()

    this.$userList.addEventListener('click', (e) => {
      const {
        target,
        target: { tagName },
      } = e

      if (tagName === 'LI') this.onSearch(target.innerText)
    })
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    this.$userList.innerHTML = this.data
      .map((user) => `<li>${user}</li>`)
      .join('')
  }
}
