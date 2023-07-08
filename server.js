const express = require('express')
const app = express();
const port = 3000;
console.log("testn")

app.get('/', (req, res)=>{
    res.send('hello world')
})
app.listen(port, ()=>{
    console.log(`API is listening to port ${port}`)
})