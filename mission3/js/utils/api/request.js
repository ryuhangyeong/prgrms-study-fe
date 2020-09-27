export default async (url, opts = {}) => {
  const res = await fetch(url, opts)
  const data = await res.json()

  if (data.length === 0) throw new Error('검색 결과가 존재하지 않습니다.')

  return data
}
