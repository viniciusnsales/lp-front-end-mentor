/* eslint-disable no-new */
import SmoothScroll from 'smooth-scroll'

const Scroll = () => {
  new SmoothScroll('.js-scroll-to', {
    speed: 500,
    speedAsDuration: true,
    offset: 0,
  })
}

export default Scroll
