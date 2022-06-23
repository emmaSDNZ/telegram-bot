
const express = require('express')
const app = express()

const PORT = 3000

const quotes = require('./frases.json');

app.get('/quotes/:type', (req,res)=>{
    const type = req.params.type
    if(!Object.keys(quotes).includes(type)) {
        return res.json({err: "Not found"})
    }

    const selectedQuotes = quotes[type]
  
    const index =  Math.ceil(Math.random() * ((selectedQuotes.length - 1) - 0) + 0)

    return res.json({"quote": selectedQuotes[index]})
})

app.listen(PORT, () => {
    console.log('Escuchando en el puerto: ' + PORT);
})