export default class Loading {
  constructor({ $target, initialData = false }) {
    this.$target = $target
    this.data = initialData

    this.$wrapper = document.createElement('div')
    this.$wrapper.className = 'Loading'

    this.$loading = document.createElement('div')
    this.$loading.className = 'Loading-inner'

    this.$wrapper.appendChild(this.$loading)
    this.$target.appendChild(this.$wrapper)
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    if (this.data) {
      this.$wrapper.style.display = 'flex'
      return
    }
    this.$wrapper.style.display = 'none'
  }
}
