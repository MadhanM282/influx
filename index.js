const express = require('express');

const items = require("./src/controller")

const app = express();

app.use(express.json());

app.use("/",items)

app.listen(2900,()=>{
    try {
        console.log("running on 2900")
    } catch (error) {
        console.log('error', error);
        
    }
})  