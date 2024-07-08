const $die = $('.die')
const sides = 20
const initialSide = 1
const transitionDuration = 500
const animationDuration  = 1500
let lastFace = undefined
let timeoutId = undefined

const randomFace = () => {
  const face = Math.floor((Math.random() * sides)) + initialSide
  lastFace = face == lastFace ? randomFace() : face
  return face;
}

const rollTo = (face) => {
  clearTimeout(timeoutId)
  $die.attr('data-face', face)
}

const reset = () => {
  $die.attr('data-face', null).removeClass('rolling')
}

$('.randomize, .die').click(() => {
  $die.addClass('rolling')
  clearTimeout(timeoutId)
  
  timeoutId = setTimeout(() => {
    $die.removeClass('rolling')
    
    rollTo(randomFace())
  }, animationDuration)
  
  return false
})