export default class SearchInput {
  $target = null
  $searchInput = null
  onSearch = null

  constructor({ $target, onSearch }) {
    this.$target = $target
    this.$searchInput = document.createElement('input')
    this.$searchInput.placeholder = '검색하세요'

    this.$target.appendChild(this.$searchInput)

    this.onSearch = onSearch

    this.$searchInput.addEventListener('keyup', (e) => {
      const { value } = e.target
      if (!value) return
      this.onSearch(value)
    })
  }
}
