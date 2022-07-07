const express= require('express');

const items = [
    {code:1,name:"Ice-Cream",unitPrice:40},
    {code:2,name:"Cream-Cake",unitPrice:50},
    {code:3,name:"Pizza",unitPrice:10},
    {code:4,name:"Spring-Rolls",unitPrice:140}
]

const rout = express.Router()

rout.get("/itemMaster/items",async(req,res)=>{
    try {
        
        res.send(items)
    } catch (error) {
        console.log('error', error.message);
        res.send(error.message)
    }
})

rout.get("/itemMaster/items/:id",async(req,res)=>{
    try {
        let id = req.params.id
        console.log(id);
        items.filter(e => {
            if(e.code==id){

                return res.send(e)
            }
        })
        res.send("Item Not Found")
    } catch (error) {
        console.log('error', error.message);
        res.send(error.message)
    }
})

rout.post("/itemMaster/items",async(req,res)=>{
    try {
        items.push(req.body)
        res.send(items)
    } catch (error) {
        
    }
})

// User Cart

let cart = []

rout.post("/userCart/order/:id",async(req,res)=>{
    try {
        let data = {}
        let id = req.params.id
        let qty = req.body.qty
        items.filter(e => {
            if(e.code==id){
                data.qty = qty
                data.code = e.code
                data.unitPrice = e.unitPrice
                data.totalAmt = e.unitPrice*qty
                let final = [...cart,data]
                return res.send(final)
            }
        })
        res.send("Item Not Found")
    } catch (error) {
        
    }
})

let summary = [
    {code:1,qty:5,unitPrice:20,totlaAmt:100},
    {code:2,qty:1,unitPrice:50,totlaAmt:50},
    {code:3,qty:5,unitPrice:10,totlaAmt:50}
]

rout.get("/userCart/order/:id/summarize",async(req,res)=>{
    try {
        let final = []
        let obj = {}
        for(let i =0;i<summary.length;i++){
            summary.filter(e => {
                if(e.code==cart[0].code){
                    let data = e
                    data.qty+=cart[0].qty
                    data.totlaAmt+=cart[0].totalAmt
                    final.push(data)
                }
                else{
                    final.push(e)
                }
            })
        }
        res.send(final)
    } catch (error) {
        console.log('error', error.message);
        
    }
})



module.exports = rout

