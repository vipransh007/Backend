const express = require('express')
const app = express();
const port =3000;

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/twitter', (req,res) => {
    res.send('Vipransh Anand')
})

app.get('/login', (req,res) => {
    res.send('<h1> Please Login at Vipranshs Job Portal</h1>')
})

app.listen(port , () => {
    console.log(`Example app running on port ${port} `)
})