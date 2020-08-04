export default (form) => {
  const serialized = {}

  for (let i = 0; i < form.elements.length; i++) {
    const field = form.elements[i]

    if (
      !field.name ||
      field.disabled ||
      field.type === 'file' ||
      field.type === 'reset' ||
      field.type === 'submit' ||
      field.type === 'button'
    )
      continue

    if (field.type !== 'checkbox' && field.type !== 'radio') {
      serialized[field.name] = field.value
    }

    if (field.type === 'checkbox' || field.type === 'radio') {
      if (field.checked) {
        serialized[field.name] = field.value
      } else {
        serialized[field.name] = false
      }
    }
  }

  return serialized
}
