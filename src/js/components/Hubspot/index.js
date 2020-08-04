import axios from 'axios'
import Cookies from 'js-cookie'
import serialize from '../../helpers/serialize'
import loading from '../../helpers/loading'

const getHubspotURL = (hubspotFormId) => {
  return `https://api.hsforms.com/submissions/v3/integration/submit/3453052/${hubspotFormId}`
}

const handleOnSubmit = async (event) => {
  event.preventDefault()

  const form = event.target
  const { hubspotFormId, hubspotOriginName, hubspotRedirectTo } = form.dataset

  const data = serialize(form)
  const submitButton = form.querySelector('.js-submit-button')

  loading(submitButton)

  const formData = {
    fields: parseFieldsToHubspot(data),
    context: {
      pageUri: window.location.href,
      pageName: hubspotOriginName,
      hutk: Cookies.get('hubspotutk') || '',
    },
  }

  if (window.dataLayer && data.eventName) {
    window.dataLayer.push({ event: data.eventName })
  }

  try {
    await axios({
      method: 'post',
      url: getHubspotURL(hubspotFormId),
      data: formData,
    })

    submitButton.innerHTML = 'Enviado com sucesso!'

    if (hubspotRedirectTo) {
      return window.location.replace(hubspotRedirectTo)
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading(submitButton, false)
  }
}

const parseFieldsToHubspot = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }))
}

const Hubspot = () => {
  document.querySelectorAll('.js-hubspot-form').forEach((form) => {
    form.addEventListener('submit', (event) => handleOnSubmit(event))
  })
}

export default Hubspot
