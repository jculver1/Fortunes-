const express = require('express')
const app = express()
const port = 3000
const data = require('./data.json')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())

app.get('/data', (req, res, next) => {
    res.status(200).send({
        message: 'success',
        data: data
    })
})

app.get('/:month', (req, res, next) => {
    const monthParam = req.params.month
    if(!data.fortunes.filter(m => m.month.includes(monthParam))){
        res.status(404).send("That month does not exist. Try capitalizing the first letter of your month")
    }else{
        const matching = data.fortunes.filter(sign => sign.month.includes(monthParam))
        res.status(200).send(matching)
    }
})

app.post('/', (req, res) => {
    res.send(req.body)
    console.log(req.body)
})

app.use((req, res, next) => {
    res.status(404).send('Either this route does not exist or there is an internal server error')
})

app.listen(port, () => console.log(`Porty on the port ${port}`))