const request = require('request')
const opencage = require('opencage-api-client');
// Geocoding with mapbox
const reverseGeocode = (latitude, longitude, callback) => {
  // const url = 'https://api.opencagedata.com/geocode/v1/json?key=8ade1b5f7d6c483ea456cee678dcba10&q=' + latitude + ',' + longitude + '&pretty=1'
  //   + '&no_annotations=1'
  // console.log(url)
  const geolocation = latitude + ', ' + longitude

  opencage.geocode({q: geolocation, language: 'en'}).then(data => {
    // console.log(JSON.stringify(data));
    if (data.status.code == 200) {
      if (data.results.length > 0) {
        let place = data.results[0];
        let location = place.components.city
        callback(null, { location })
      }
    } else if (data.status.code == 402) {
      console.log('hit free-trial daily limit');
      console.log('become a customer: https://opencagedata.com/pricing');
    } else {
      console.log('error', data.status.message);
    }
  }).catch(error => {
    console.log('error', error.message);
  });
}

module.exports = reverseGeocode

// request({ url, json: true}, (error, { body }) => {
//   if (error) {
//     callback(null, 'Unable to connect to location services!')
//   } else if (body.results.components.city){
//     callback(null, 'Unable to find location. Try another search.')
//   } else {
//     console.log(body.results.components.city)
//     callback(null, {
//       location: body.features[0].text
//     })
//   }
// })
