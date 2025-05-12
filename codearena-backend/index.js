const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000 //todo setup env port

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, ()=>{
    console.log(`codearena-backend started on post ${PORT}`);
})