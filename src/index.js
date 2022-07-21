const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { findByIdAndUpdate } = require('./models/user')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a pdf!'))
//         }

//         cb(undefined,true)
//     }
// })


// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.setHeader(400).send({error : error.message})
// })





// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })


// app.use((req,res,next)=>{
//     res.sendStatus(503).send('Site is under maintainance')
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

// const bcrypt = require('bcryptjs')

// const myFunction= async ()=>{
//     const password = "Red123456!"
//     const hashedPassword = await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare("Red123456!",hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

//jasonwebtoken

// const jwt = require('jsonwebtoken')

// const myFunction = async()=>{
//     const token = await jwt.sign({_id:'abc12345'},'thisismyproject',{expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token,'thisismyproject')
//     console.log(data)
// }
// myFunction()



// const main = async()=>{
//     // const task = await Task.findById('62d0012bb79bd330ec63bba9') 
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('62d02c110ea9584c645b2bcf')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
//main()