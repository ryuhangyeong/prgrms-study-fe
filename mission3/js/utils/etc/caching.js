/*
 * 코드 정리 예정
 */
export default (fn) => {
  const cache = new Map()

  return (k) => {
    if (cache.has(k)) {
      return cache.get(k)
    }

    const result = fn(k)
    cache.set(k, result)
    return result
  }
}
