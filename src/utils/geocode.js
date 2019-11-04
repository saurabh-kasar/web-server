const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F1cmFiaGthc2FyIiwiYSI6ImNrMmZ0N3Z5aTBheXMzbXFncDNvaW4yN2YifQ.5lTTeZyrdwOYUvg1W0UKjw&limit=1'

    request ({ url: url, json: true }, (error,response)=> {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode





// const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1Ijoic2F1cmFiaGthc2FyIiwiYSI6ImNrMmZ0N3Z5aTBheXMzbXFncDNvaW4yN2YifQ.5lTTeZyrdwOYUvg1W0UKjw'

// request({ url: url1, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location service')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try again!')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log( latitude, longitude )
//     }  
// })