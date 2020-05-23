const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials/')


app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wether App',
        name: 'Jeet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jeet soni'
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jeet soni'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    geocode(req.query.address, ({latitude,longitude,location} = {}) => {
        forecast(latitude,longitude, (weatherinfo) => {
            console.log(weatherinfo)
            res.send([
                {
                    forecast: weatherinfo,
                    location,
                    address: req.query.address
        
                }
            ])
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_notfound',{
        title: '404',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404_notfound',{
        title: '404',
        msg: 'page not found'
})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
