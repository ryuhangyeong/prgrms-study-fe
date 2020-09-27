export default class SearchResult {
  $target = null
  $searchResult = null
  data = null

  constructor({ $target, initialData = [] }) {
    this.$target = $target
    this.data = initialData

    this.$searchResult = document.createElement('ul')

    this.$target.appendChild(this.$searchResult)

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        ({ imageUrl, title }) => `
      <li>
        <img src="${imageUrl}" alt=${title} />
      </li>
    `
      )
      .join('')
  }
}
