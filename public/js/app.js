console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const currentLocation = document.querySelector('#gpsLocation')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(navigator.location)

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})

currentLocation.addEventListener('click', (e) => {
  e.preventDefault()

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert("Geolocation is not supported by this browser.")
  }

  function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude)
    console.log("Longitude: " + position.coords.longitude)
    fetch('/weather?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude).then((response) => {
      response.json().then((data) => {
        console.log(data)
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
    })
  }

})
