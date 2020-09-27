import { SearchHistory, SearchInput, SearchResult } from './components/index.js'
import { getJjalListByKeyword } from './utils/api/jjals.js'
import { caching, debounce } from './utils/etc/index.js'

export default class App {
  state = {
    historyData: [],
  }

  constructor($target) {
    this.init($target)
  }

  init($target) {
    try {
      const JjalListcacheWrapper = caching(getJjalListByKeyword)

      this.searchHistory = new SearchHistory({
        $target,
        onSearch: async (value) => {
          const data = await JjalListcacheWrapper(value)
          this.searchResult.setState(data)
          this.searchInput.$searchInput.value = value
        },
      })

      this.searchInput = new SearchInput({
        $target,
        onSearch: async (value) => {
          const DEBOUNCE_TIME = 700

          debounce(async () => {
            const { historyData } = this.state
            const idx = historyData.indexOf(value)

            if (idx > -1) this.state.historyData.splice(idx, 1)

            const data = await JjalListcacheWrapper(value)

            this.searchResult.setState(data)
            this.state.historyData = [value, ...historyData]
            this.searchHistory.setState(this.state.historyData)
          }, DEBOUNCE_TIME)
        },
      })

      this.searchResult = new SearchResult({
        $target,
      })
    } catch (e) {
      // 하위 컴포넌트에서 발생한 에러를 정상적으로 캐치하지 못합니다. 해결 방법에 대한 힌트를 주실 수 있으실까요?
      alert(e)
    }
  }
}
