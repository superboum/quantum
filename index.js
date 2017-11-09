const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/a', (req, res) => res.render('index'))

app.listen(3000, () => console.log('QUANTUM'))
