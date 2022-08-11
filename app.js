const express = require('express')
const app = express()
const request = require('request')
const port = 5400

const API_KEY = process.env.API_KEY
const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&mode=json&units=metric&cnt=8&appid=${API_KEY}`

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get('/', (req, res) => {
    res.send('API is working')
})

app.get('/weather', (req, res) => {
    let options = {
        url: URL,
        headers: {
            'User-Agent': 'request'
        }
    }
    let weatherData = new Promise(function(resolve, reject) {
        request.get(options, (err, resp, result) => {
            if(err) reject(err)
            else resolve(JSON.parse(result))
        })
    }).then(result => {
        res.render('main', {result, title: 'Weather'})
        // res.send(result)
    })
})

app.listen(port, err => {
    if(err) console.log('Error in API call')
    else console.log('App is running on port', port)
})