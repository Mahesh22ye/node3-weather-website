const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeUtil = require('../utils/geocode')
const forecast = require('../utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)


// Setup staic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name : 'Mahesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mahesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name : 'Mahesh',
        helpText : 'This is the best help message'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocodeUtil(req.query.address, (error, { lattitude, longitude, placeName } = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(longitude, lattitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                address: req.query.address,
                location: placeName,
                forecast: forecastData
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

    res.send({
        products: []
    })
})

//for 404 error - use *
app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        title: 'Error 404',
        name: 'Mahesh',
        errorMessage : 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: 'Error 404',
        name: 'Mahesh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
