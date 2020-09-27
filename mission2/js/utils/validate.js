const isValidTodos = (data) => {
  if (
    data.some(
      ({ text, isCompleted }) =>
        !!!text ||
        typeof text !== 'string' ||
        isCompleted === undefined ||
        typeof isCompleted !== 'boolean'
    )
  ) {
    throw new Error('awrong todo data')
  }
}
