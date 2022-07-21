const express = require('express')
const { update } = require('../models/user')
const User = require('../models/user')
const router  = new express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')
const sharp = require('sharp')

router.post('/users',async (req,res)=>{
    const user= new User(req.body)
 //async await method
    try{
     await user.save()
     const token =  await user.generateAuthToken()
     res.status(201).send({user,token})
    }catch(e){
     res.status(400).send(e)
    }
     //promise method
 //    user.save().then(()=>{
 //     res.status(201).send(user)
 //    }).catch((e)=>{
 //     res.status(400).send(e)
 //    })
 })


 //for login credentials

 router.post('/users/login',async(req,res)=>{
    try{
    const user= await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    // res.send({user:user.getPublicProfile(), token})
    res.send({user, token})

    }catch(e)
    {
        res.sendStatus(400).send()
    }

 })

 router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })

        await req.user.save()

        res.send()
    }catch(e){  
        res.sendStatus(500).send()
    }
 })


 router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.sendStatus(500).send()
    }
 })
 
 router.get('/users/me',auth,async(req,res)=>{
        res.send(req.user)
    
    //  try{
    //      const users= await User.find({})
    //      res.send(users)
    //  }catch(e){
    //      res.sendStatus(500).send()
    //  }
 
     // User.find({}).then((users)=>{
     //     res.send(users)
     // }).catch((e)=>{
     //     res.sendStatus(500).send()
     // })
 })
 

 //remove this route because we have authenticated user profile


//  router.get('/users/:id',async (req,res)=>{
//     const  _id=req.params.id
//      try{
//       const user =await  User.findById(_id)
//       if(!user)
//       {
//          res.setHeader('error',404).send()
//       }
 
//       res.send(user)
//     }catch(e){
//      res.setHeader('error',500).send()
//     }
 
//  //    User.findById(_id).then((user)=>{
//  //     if(!user)
//  //     {
//  //         return res.sendStatus(404).send()
//  //     }
 
//  //     res.send(user)
//  //    }).catch((e)=>{
//  //     res.send(500).send(e)
//  //    })
//  })
 
 //update route
 
//  router.patch('/users/:id',async(req,res)=>{
    router.patch('/users/me',auth,async(req,res)=>{

     const updates  = Object.keys(req.body)
     const allowdUpdates = ['name','email','password','age']
     const isValidOperation = updates.every((update)=>allowdUpdates.includes(update))
 
     if(!isValidOperation)
     {
         return res.setHeader('error',400).send({error:'Enter valid update'})
     }
 
     try{
        // const user = await User.findById(req.params.id)
        updates.forEach((update)=>req.user[update]= req.body[update])
        await req.user.save()
        
    //  const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
    //  if(!user){
    //     return res.setHeader('error',404).send()
    //  }
 
     res.send(req.user)
     }catch(e){
         res.setHeader('error',400).send(e)
     }
 })
 
 
//  router.delete('/users/:id',async (req,res)=>{
    router.delete('/users/me',auth,async (req,res)=>{

     try{
        //  const user= await User.findByIdAndDelete(req.params.id)
        // const user= await User.findByIdAndDelete(req.user._id)

        //  if(!user){
        //      res.sendStatus(404).send()
        //  }
        await req.user.remove()
          res.send(req.user)
     }catch(e){
         res.sendStatus(500).send(e)
     }
 })

 const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return  cb(new Error('Please upload in correct file format!'))
        }

        cb(undefined,true)
    }
})


 router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
   req.user.avatar =  buffer

   await req.user.save()
    res.send()
 },(error,req,res,next)=>{
    res.setHeader ('error',400).send({ error : error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch(e){
        res.sendStatus(400).send()
    }
})
 

module.exports= router