
import jQuery from 'jquery'
  
class Test {
  constructor(element, ms = 1000) {
    this.elem = jQuery(element)
    this.count = 0
    this.interval = false
    this.ms = ms
  }
  init() {
    console.log('Starting Timer')
    this.interval = setInterval(() => {this.updateTimer()}, this.ms)
  }
  updateTimer() {
    this.elem.html(this.count++) 
  }
  removeTimer() {
    console.log('Stoping Timer')
    clearInterval(this.interval)
    this.interval = false
  }
  toggle() {
    if(this.interval === false) {
      this.init()
    } else {
      this.removeTimer()
    }
  }  
}

export default Test