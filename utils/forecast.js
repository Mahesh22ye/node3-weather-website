const request = require('request')

const forecast = (lattitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=10f71ba3048db6b3675380198a8d5ffd&query=' + lattitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success === false) {
            callback('Unable to find weather for requested coordinates', undefined)
        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike   
            const description = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            const data = description + '. It is ' + temp + ' degrees out. It feels like ' + feelsLike + ' degrees. The humidity is ' + humidity+ "%."
            
            callback(undefined, data)
        }

    })

}

module.exports = forecast