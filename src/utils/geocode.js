const request = require('request')
// Geocoding with mapbox
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
  '.json?access_token=pk.eyJ1IjoiaWx5b3NzIiwiYSI6ImNqdmdxOWR2NjBhaWQ0M3E4eWw2aGJpM3AifQ.EXgHLqbNYFBMdiFgVFen5Q&limit=1'

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback(null, 'Unable to connect to location services!')
    } else if (body.features.length === 0){
      callback(null, 'Unable to find location. Try another search.')
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
