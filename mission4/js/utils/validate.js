const isValidTodos = (data) => {
  if (
    data.some(
      ({ content, isCompleted }) =>
        !!!content ||
        typeof content !== 'string' ||
        isCompleted === undefined ||
        typeof isCompleted !== 'boolean'
    )
  ) {
    throw new Error('awrong todo data')
  }
}

export { isValidTodos }
