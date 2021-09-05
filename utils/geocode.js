const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFoZXNoMjJ5ZSIsImEiOiJja3N3NTZ4aHIwcnBsMnJwbGJoNTZ2b3ZhIn0.jZrR-2_DHFEwEd1BOq-Djg&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const lattitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const placeName = body.features[0].place_name
            const data = {
                lattitude,
                longitude,
                placeName
            }

            callback(undefined, data)
        }

    })

}

module.exports = geocode