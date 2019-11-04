const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewspath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

// app.com

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app!',
        name: 'Saurabh Kasar'
    })
})

// app.com/about

app.get(('/about'), (req,res) => {
    res.render('about', {
        title:'About me',
        name:'Saurabh Kasar'
    })
})

// app.com/help

app.get(('/help'), (req,res) => {
    res.render('help', {
        title:'Help',
        helpline: 'Call 180018001800',
        name:'Saurabh Kasar'
    })
})

app.get(('/help/*'), (req,res) => {
    res.render('error', {
        title: 'ERROR!',
        errorMsg: 'Help article not found',
        name: 'Saurabh Kasar'
    })
    
})

// app.com/forecast

app.get('/forecast', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
   
    geocode(req.query.address,(error,data) => {
        if(error) {
            return res.send({error})
        } 
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                } 
                    res.send({
                        forecast: forecastData,
                        location: data.location,
                        address: req.query.address 
                    })
            })
    })  
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send( {
        products: []
    })
})

// app.com 404 page

app.get('*',(req,res) => {
    res.render('error', {
        title:'Error 404',
        errorMsg: 'Page not found!',
        name: 'Saurabh Kasar'
    })
})


app.listen(3000, () => {
    console.log('Server up on 3000!')
})