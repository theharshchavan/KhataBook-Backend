const express = require('express')
const path = require('path')
const ejs = require('ejs')
const app = express()
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
let fs = require('fs');

app.get("/",(req, res, next)=>{
    fs.readdir(`./files`,(err, files)=>{
        if(err) 
            return res.status(500).send(err)
        res.render("index",{files})
    }) 
})

app.get("/create",(req, res, next)=>{
    res.render("create")
})

app.post("/createhisaab",(req, res, next)=>{
    var currentDate = new Date()
    var date = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`
    fs.writeFile(`./files/${date}`, req.body.content, (err)=>{
        if(err) return res.status(500).send(err)
        res.redirect("/")
    })
})

app.get("/edit/:filename",(req, res, next)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err, filedata)=>{
        if(err) return res.status(500).send(err)
        res.render("edit",{filedata, filename: req.params.filename})

    })
})

app.post("/update/:filename",(req, res, next)=>{
    fs.writeFile(`./files/${req.params.filename}`,req.body.content,(err)=>{
        if(err) return res.status(500).send(err)
        res.redirect("/")
    })
})

app.get("/delete/:filename",(req, res, next)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if(err) return res.status(500).send(err)
        res.redirect("/")
    })
})


app.listen(3000)