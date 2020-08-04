import Slide from './components/Slide'
import Mask from './components/Mask'
import Scroll from './components/Scroll'
import Share from './components/Share'
import Hubspot from './components/Hubspot'

export default class App {
  constructor() {
    console.log('%cSuperlógica', 'font-size: 16px; color: #006aff')

    this.registerComponents()
  }

  registerComponents() {
    Slide()
    Mask()
    Scroll()
    Share()
    Hubspot()
  }
}

document.addEventListener('DOMContentLoaded', () => new App())
