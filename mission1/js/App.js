class App {
  $target

  constructor($target) {
    this.$target = $target

    new TodoList({
      $target,
      initialData: [
        {
          text: 'JS 공부하기',
          isCompleted: true,
        },
        {
          text: 'JS 복습하기',
          isCompleted: false,
        },
      ],
    })
  }
}
