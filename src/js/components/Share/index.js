const Share = () => {
  const providers = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u={refer}',
    whatsapp: 'https://api.whatsapp.com/send?text={title} {refer}',
    google: 'https://plus.google.com/share?url={refer}',
    twitter:
      'https://twitter.com/intent/tweet?url={refer}&text={title}&wrap_links=true',
    linkedin:
      'https://www.linkedin.com/shareArticle?mini=true&url={refer}&title={title}',
  }

  const handleOnClick = (event) => {
    const share = event.target
    const params = {
      provider: share.dataset.provider || undefined,
      title: encodeURIComponent(share.dataset.title) || null,
      body: encodeURIComponent(share.dataset.body) || null,
      refer: encodeURIComponent(share.dataset.refer) || window.location.href,
    }

    parseShareUrl(params)
  }

  const getProviderTemplate = (provider) => {
    return providers[provider]
  }

  const parseShareUrl = (params) => {
    const provider = getProviderTemplate(params.provider)

    if (provider == null) {
      throw new TypeError(`Provider inválido: "${params.provider}"`)
    }

    return window.open(
      provider.replace(/\{([^}]+)}/g, (m, key) => (params ? params[key] : ''))
    )
  }

  document.querySelectorAll('.js-share').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()

      handleOnClick(event)
    })
  })
}

export default Share
