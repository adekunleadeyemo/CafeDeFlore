//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://userName:PassWord@cluster0.6pdqp.mongodb.net/DiseaseDB?retryWrites=true&w=majority")

const con = mongoose.connection

//  con.on("open", ()=>{console.log("connected....")})
const diseaseSchema =  mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        symptoms: String,
        transmission: String,
        severity: String

})


const Disease = mongoose.model("Disease", diseaseSchema)

let query = {}
let result = []




app.get("/result", cors(), async (req, res)=>{
 
        Disease.find(query, function(err, list){
                list.forEach((it)=>{result.push(it.name)})
               res.send(result)
                
                if(!list){
                //create new list of todo lists if none is found
                console.log("Error")
                }
        })
        result = []
})

app.post("/query", async (req, res)=>{
   console.log(req.body)
   query = req.body
   res.redirect("/result")
})

// app.get("/result", cors(),(req, res)=>{
//     res.send(JSON.stringify(query))
//     // res.json(query[0])
//     // console.log(query[0])
// })
app.listen(5000,(()=>{console.log("server is running on port 5000")}))

