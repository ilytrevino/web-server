const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ily Trevino'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About this PWA',
    name: 'Ily Trevino'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    name: 'Ily Trevino',
    helpText: "Hi! Would you like to know more about me?"
  })
})

app.get('/weather', (req, res) => {
  console.log(req.query.address)
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  } else if (req.query.latitude){
    forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
  })}

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/contact/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ily Trevino',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ily Trevino',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
