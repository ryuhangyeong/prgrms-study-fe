export default class SearchHistory {
  $target = null
  $searchHistory = null
  data = null
  onSearch = null

  constructor({ $target, initialData = [], onSearch }) {
    this.$target = $target
    this.data = initialData
    this.onSearch = onSearch

    this.$searchHistory = document.createElement('ul')

    this.$target.appendChild(this.$searchHistory)

    this.render()

    this.$searchHistory.addEventListener('click', (e) => {
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
    this.$searchHistory.innerHTML = this.data
      .map(
        (item) => `
      <li>${item}</li>
    `
      )
      .join('')
  }
}
