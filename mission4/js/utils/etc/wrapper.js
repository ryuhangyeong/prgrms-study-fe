/*
 * @questions 비동기 코드도 함께 처리하기 위해 async ~ await를 사용했지만 fn에 동기 함수도 전달되는 경우가 있어서 의도 파악이 안될수도 있겠다라는 생각이 든다.
 */
const wrapLoading = async (fn, loading) => {
  try {
    loading.setState(true)
    await fn()
    loading.setState(false)
  } catch (e) {
    alert(e)
    loading.setState(false)
  }
}

const wrapError = async (fn) => {
  try {
    await fn()
  } catch (e) {
    alert(e)
  }
}

export { wrapLoading, wrapError }
