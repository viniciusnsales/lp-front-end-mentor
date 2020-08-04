import boolParse from '../../helpers/boolParse'

export default (slide) => {
  return {
    trigger: slide.dataset.trigger || null,
    template: slide.dataset.template || null,
    mobile: slide.hasAttribute('data-mobile')
      ? parseInt(slide.dataset.mobile)
      : 992,
    onlyMobile: slide.hasAttribute('data-only-mobile')
      ? boolParse(slide.dataset.onlyMobile)
      : false,
    simulateTouch: slide.hasAttribute('data-simulate-touch')
      ? boolParse(slide.dataset.simulateTouch)
      : true,
    autoPlay: slide.hasAttribute('data-auto-play')
      ? boolParse(slide.dataset.autoPlay)
      : false,
    loop: slide.hasAttribute('data-loop')
      ? boolParse(slide.dataset.loop)
      : false,
    autoHeight: slide.hasAttribute('data-simulate-touch')
      ? boolParse(slide.dataset.simulateTouch)
      : false,
    spaceBetween: parseInt(slide.dataset.spaceBetween) || 0,
    perViewXS: parseInt(slide.dataset.perViewXs) || 1,
    perViewSM: parseInt(slide.dataset.perViewSm) || 1,
    perViewMD: parseInt(slide.dataset.perViewMd) || 1,
    perViewLG: parseInt(slide.dataset.perViewLg) || 1,
    perViewXL: parseInt(slide.dataset.perViewXl) || 1,
    perView: parseInt(slide.dataset.perView) || 1,
    perColumn: parseInt(slide.dataset.perColumn) || 1,

    effect: slide.dataset.effect || 'slide', // "slide", "fade", "cube", "coverflow", "flip"
    pagination: slide.dataset.pagination || 'bullets', // "bullets", "fraction", "progressbar",
    direction: slide.dataset.direction || 'horizontal',
  }
}
