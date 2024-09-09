import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
import fs from "fs"

dotenv.config({path:"./.env"})
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(path.join(__dirname,"public")))//loc of static assets

app.set("view engine","ejs")//to render index page


app.get("/",(req,res)=>{
  res.render("index")
})

app.get("/profile/:username",(req,res)=>{

   res.send(`welcome ${req.params.username}`)
})

app.get("/author/:username/:age",(req,res)=>{

    res.send(`welcome ${req.params.username} of age ${req.params.age}`)
 })

//file sys : sync and callback apis

app.get("/fs",(req,res)=>{
  
  fs.writeFile("f1.txt","hello",(err)=>{
    if(err) console.log(err)
    else console.log("write")
  })

  fs.appendFile("f1.txt"," how are you",(err)=>{
    if(err) console.log(err)
    else console.log("append")
  })

  fs.rename("f1.txt","fileraj.txt",(err)=>{
    if(err) console.log(err)
    else console.log("renamed")
  })

  //             src            dest
  fs.copyFile("fileraj.txt","hello.txt",(err)=>{
    if(err) console.log(err.message)
    else console.log("copy")
  })

  fs.unlink("hello.txt",(err)=>{
    if(err) console.log(err.message)
    else console.log("file deleted")
  })
// remove directory
  fs.rm("./copy",{recursive:true},(err)=>{
    if(err) console.log(err.message)
    else console.log("folder deleted")
  })

  fs.mkdir("./paste",(err)=>{
    if(err) console.log(err.message)
    else console.log("folder created")
  })





})


app.get("/notimplemented",(req,res)=>{

 return next(new Error("not implemented"))
})


//geh
app.use((err,req,res,next)=>{
  console.log("stack",err.stack)
  res.status(500).send("not imp")
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("app is running at : ",process.env.PORT || 3000)
})