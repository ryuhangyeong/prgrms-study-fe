const store = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      localStorage.clear()
    }
  },
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      console.log('localStorage not working')
    }
  },
}
