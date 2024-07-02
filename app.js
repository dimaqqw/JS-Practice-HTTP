const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

// 200 - первый запрос
// 304 - первый запрос повторно
// 401 - второй запрос
// 404 - первый запрос с неправильным городом
// 429  - слишком много запросов
// 100 - нету
// 500 - нужно ломать апишку openweathermap

const API_KEY = '30d885384232aad7795219f5f51be4a8'
// Запрос 1
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

  try {
    const response = await axios.get(url)
    if (response.status === 200) {
      res.status(200).json(response.data)
    } else {
      res.status(response.status).send(response.statusText)
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.statusText)
    } else if (error.request) {
      res.status(500).send('No response from server')
    } else {
      res.status(500).send('Request error')
    }
  }
})

// Запрос 2
app.get('/weather/:city/401', async (req, res) => {
  const city = req.params.city
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}`

  try {
    const response = await axios.get(url)
    if (response.status === 200) {
      res.status(200).json(response.data)
    } else {
      res.status(response.status).send(response.statusText)
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.statusText)
    } else if (error.request) {
      res.status(500).send('No response from server')
    } else {
      res.status(500).send('Request error')
    }
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
