class TodoAllRemoveBtn {
  $target = null
  $todoAllRemoveBtn = null

  constructor({ $target }) {
    this.$target = $target

    this.$todoAllRemoveBtn = document.createElement('button')
    this.$todoAllRemoveBtn.textContent = '모두 삭제'
    this.$target.appendChild(this.$todoAllRemoveBtn)

    this.$todoAllRemoveBtn.addEventListener('click', (e) => {
      e.target.dispatchEvent(new CustomEvent('removeAll'))
    })
  }
}
