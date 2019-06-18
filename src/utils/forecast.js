const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/85dfef7c4c514aa2302824c4671ea6c2/' + latitude + ',' + longitude + '?units=si'
  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.trunc(body.currently.temperature) +
      '° C out. The high today is ' + Math.trunc(body.daily.data[0].temperatureHigh) + '° C with a low of ' + Math.trunc(body.daily.data[0].temperatureLow) +
      '° C.')
    }
  })
}

module.exports = forecast
