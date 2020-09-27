const defaultOpts = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export default async (url, opts = {}) => {
  const res = await fetch(url, { ...defaultOpts, ...opts })
  if (res.ok) return await res.json()
  throw new Error('잘못된 요청입니다.')
}
