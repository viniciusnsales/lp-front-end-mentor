const loading = (
  button,
  load = true,
  style = 'spinner-border spinner-border-sm'
) => {
  if (load === true) {
    button.disabled = true

    const spinner = document.createElement('span')

    spinner.setAttribute('class', style)
    spinner.setAttribute('role', 'status')

    button.appendChild(spinner)
  } else {
    if (button.querySelector('.spinner-border')) {
      button.querySelector('.spinner-border').remove()
      button.disabled = false
    }
  }
}

export default loading
