const express = require('express')
const path = require('path')
const https = require('https')
const app = express();
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) =>{
    res.render('index', {title:'Weather App'})  
})

app.post('/', (req, res) => {
// console.log(req.body.cityName)
const query = req.body.cityName
const units = "metric" 
const apiKey = "f55591a2d60a7e74ab38840e087d7979"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey

https.get(url, (response)=>{
    
    response.on('data', (data)=>{
        const weatherData = JSON.parse(data)
        const weatherDesc = weatherData.weather[0].description
        const temp = weatherData.main.temp
        const icon = weatherData.weather[0].icon
        const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        
        // res.write("<p>The temperature of "+ query+" is "+ temp +" </p>")
        // res.write("<h1>The weather decription of "+ query+" is "+ weatherDesc +" </h1>")
        // res.write("<img src="+imgUrl+">")
        
        

        res.render('weatherType', {title:'weather',query, weatherData, weatherDesc, temp, icon, imgUrl})
        // res.send('<h1>The temperature of mumbai is '+ temp+ ' Weather is '+ weatherDesc+'</h1>')
    })

})
})

app.get('/calc', (req, res) =>{
    res.render('calc', {title:'Calculator App'})
})
app.post('/calc', (req, res) =>{
    const num1 = parseInt(req.body.num1)
    const num2 = parseInt(req.body.num2)
    const calculatedValue = (num1 + num2)
    // res.send(`<h1>The calculated value is ${calculatedValue}</h1>`)
    res.render('value', {title: 'value', calculated:calculatedValue})
})
app.listen(port, (req, res) => {
    console.log('Listening on port 3000')
})