const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req,res)=>{
    res.type('text/plain')
    res.send("page d'acceuil")
});

app.get('/catways',(req,res)=>{
    res.type('text/plain')
    res.send("page CRUD pour catways")
});

app.use((req, res)=>{
    res.type('text/plain')
    res.status(404)
    res.send("404 page introuvable")
});

app.listen(port,() => {
    console.log('server app listening on port ' + port);
});