let timer

export default (fn, second) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => (fn(), (timer = null)), second)
}
