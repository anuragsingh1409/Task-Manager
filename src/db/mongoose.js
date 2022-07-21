const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//creating model
// const User = mongoose.model('User',{
//     name:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     email:{
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value))
//             {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type: String,
//         required:true,
//         trim: true,
//         minlength: 7,
//         validate(value){
//            if(value.includes('password'))
//             {
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default: 0,
//         validate(value){
//             if(value<0)
//             {
//                 throw new Error('Age must be a positive number!')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '   Anurag   ',
//     email: '  anu@gmail.com  ',
//     password: 'Anura@1'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })

// const mee = new User({
//     name: 'Anu   ',
//     email: '   anunaurag@gmail.com ',
//     password: 'passwor1',
//     age: 20
// })

// mee.save().then(()=>{
//     console.log(mee)
// }).catch((error)=>{
//     console.log(error)
// })

// const Task = mongoose.model('Task',{
//     description:{
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed:{
//         type:Boolean,
//         default: false,
//         trim: true
//     }
// })

// const me1 = new Task({
//     description:'First wake up early',
//     completed: false
// })
// me1.save().then(()=>{
//     console.log(me1)
// }).catch((error)=>{
//     console.log('Error!',error)
// })