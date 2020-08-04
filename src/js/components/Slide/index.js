import Swiper from 'swiper'
import setSettings from './settings'
import axios from 'axios'

const slides = {}

const create = (slide, index, settings) => {
  const container = slide.querySelector('.slide-container')
  if (container) container.classList.add('swiper')

  const wrapper = slide.querySelector('.slide-wrapper')
  wrapper.classList.add('swiper-wrapper')

  slide.querySelectorAll('.slide-item').forEach((item) => {
    item.classList.add('swiper-slide')
  })

  slides[index] = new Swiper(`.slide-container-${index}`, {
    pagination: {
      el: `.slide-pagination-${index}`,
      type: settings.pagination,
      clickable: true,
      renderFraction: function (currentClass, totalClass) {
        return `
          <span class="${currentClass}"></span>
          /
          <span class="${totalClass}"></span>
        `
      },
      renderCustom: function (swiper, current, total) {
        const progress = (100 / total) * current

        return `
          <span class="swiper-pagination-current">${current}</span>
          <span class="swiper-pagination-progress-bar">
            <span class="swiper-pagination-progress" style="width: ${progress}%;"></span>
          </span>
          <span class="swiper-pagination-total">${total}</span>
        `
      },
    },
    navigation: {
      nextEl: `.slide-next-${index}`,
      prevEl: `.slide-prev-${index}`,
    },
    slideClass: 'swiper-slide',
    wrapperClass: 'swiper-wrapper',
    loop: settings.loop,
    autoplay: settings.autoPlay,
    effect: settings.effect,
    simulateTouch: settings.simulateTouch,
    spaceBetween: settings.spaceBetween,
    direction: settings.direction,
    autoHeight: settings.autoHeight,
    slidesPerView: settings.perView,
    slidesPerColumn: settings.perColumn,
    breakpoints: {
      0: {
        slidesPerView: settings.perViewXS,
      },
      768: {
        slidesPerView: settings.perViewSM,
      },
      992: {
        slidesPerView: settings.perViewMD,
      },
      1200: {
        slidesPerView: settings.perViewLG,
      },
      1600: {
        slidesPerView: settings.perViewXL,
      },
    },
  })

  if (settings.trigger && settings.template) {
    const template = document.querySelector(settings.template)
    const trigger = document.querySelector(settings.trigger)

    handleOnChangeOrInit(slides[index], trigger, template)

    trigger.addEventListener('change', (e) => {
      e.preventDefault()

      handleOnChangeOrInit(slides[index], trigger, template)
    })
  }
}

const handleOnChangeOrInit = async (slide, trigger, template) => {
  const items = await loadSlides(trigger, template)

  slide.removeAllSlides()
  slide.appendSlide(items)
  slide.slideTo(0)

  // eslint-disable-next-line no-undef
  refreshFsLightbox()
}

const loadSlides = async (trigger, template) => {
  const endpoint = trigger.dataset.endpoint
  const date = trigger.value

  try {
    const response = await axios.get(endpoint, {
      params: {
        date,
      },
    })

    const items = await parseTemplate(template, response.data)

    return items
  } catch (error) {
    console.error(error)
  }
}

const parseTemplate = (template, data) => {
  const templateHtml = template.innerHTML
  const list = []

  data.map((item, i) => {
    const slideItem = templateHtml
      .replace(/%label%/g, item.label)
      .replace(/%thumb%/g, item.thumb)
      .replace(/%image%/g, item.image)

    list.push(slideItem)
  })

  return list
}

const handleOnResize = (slide, index, settings) => {
  window.addEventListener('resize', () => {
    if (window.innerWidth < settings.mobile && !slides[index]) {
      create(slide, index, settings)
    } else if (window.innerWidth >= settings.mobile) {
      slide.classList.remove('swiper')

      const wrapper = slide.querySelector('.slide-wrapper')

      if (wrapper.classList.contains('swiper-wrapper')) {
        wrapper.classList.remove('swiper-wrapper')
      }

      const items = slide.querySelectorAll('.slide-item')

      items.forEach((item) => {
        if (item.classList.contains('swiper-slide')) {
          item.classList.remove('swiper-slide')
        }
      })

      if (slides[index]) {
        slides[index].destroy(false, true)
        slides[index] = undefined
      }
    }
  })
}

const Slide = () => {
  document.querySelectorAll('.js-slide').forEach((slide, index) => {
    const settings = setSettings(slide)

    const container = slide.querySelector('.slide-container')
    if (container) container.classList.add(`slide-container-${index}`)

    const pagination = slide.querySelector('.slide-pagination')
    if (pagination)
      pagination.classList.add(`slide-pagination-${index}`, 'swiper-pagination')

    const prev = slide.querySelector('.slide-button-prev')
    if (prev) prev.classList.add(`slide-prev-${index}`, 'swiper-button-prev')

    const next = slide.querySelector('.slide-button-next')
    if (next) next.classList.add(`slide-next-${index}`, 'swiper-button-next')

    if (settings.onlyMobile === true) {
      slide.classList.add('swiper-only-mobile')

      if (window.outerWidth <= settings.mobile) {
        create(slide, index, settings)
      }

      handleOnResize(slide, index, settings)
    } else {
      create(slide, index, settings)
    }
  })
}

export default Slide
