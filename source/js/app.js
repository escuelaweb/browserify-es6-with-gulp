import jQuery from 'jquery'
import Timer from './timer.js'
  
jQuery(document).ready(function() {
  console.log('Cargando jQuery desde NPM')
  let timer = new Timer('.timer')
  timer.init()
  jQuery('.boton-con-click').click(() => {
    timer.toggle()
  })
})