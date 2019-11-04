const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const wurl = 'https://api.darksky.net/forecast/a74f14a2040952eb83b30b957e07cfa4/' + longitude + ',' + latitude + '?units=si'

    request ({url: wurl, json:true}, (error, response) => {
        if(error) {
            callback('Unable to contact weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is ' +
            + response.body.currently.temperature + ' degrees out. There is a ' 
            + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast



// const url = 'https://api.darksky.net/forecast/a74f14a2040952eb83b30b957e07cfa4/18.5204,73.8567?units=si'

// request({ url: url, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log( response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//     }
    
// })

