const express = require('express')
const Task = require('../models/task')
const auth  = require('../middleware/auth')
const router  = new express.Router()
const User = require('../models/user')


router.post('/tasks',auth,async (req,res)=>{
    // const task= new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
       await task.save()
       res.status(201).send(task)
    }catch(e)
    {
        res.status(400).send(e)
    }


    // task .save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})


//GET /task?completed=true
//GET /tasks?limit=10&skip=20
//GET /task?sortedBy= createdAt:asc
router.get('/tasks',auth,async(req,res)=>{
    const match = {}
    const sort={}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]= parts[1==='desc'?-1:1]
    }

    try{
        // const task = await Task.find({})
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e)
    {
        res.sendStatus(500).send(e)   
    }
    //     Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((e)=>{
    //     res.sendStatus(500).send(e)
    // })
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id
    try{
       // const task = await Task.findById(_id)
       const task = await Task.findOne({_id, owner:req.user._id})
        if(!task){
            res.setHeader('Server error',404).send()
        }

        res.send(task)
    }catch(e)
    {
        res.setHeader('Error',500).send(e)
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.setHeader('Server error',404).send()
    //     }

    //     res.send(task)
    // }).catch((e)=>{
    //     res.setHeader('Error',500).send(e)
    // })
})

router.patch('/tasks/:id',auth, async(req,res)=>{
    const updatestask= Object.keys(req.body)    
    const allowedUpdate= ['description','completed']
    const isValidUpdate = updatestask.every((update)=>allowedUpdate.includes(update))
    if(!isValidUpdate)
    {
        return res.setHeader('error',400).send({error:'Enter valid update'})
    }
    try{

        // const task= await Task.findById(req.params.id)

        const task = await Task.findOne({_id: req.params.id , owner: req.user._id})
        
    // const task =  await Task.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
    if(!task)
    {
        res.setHeader('error',404).send()
    }

    updatestask.forEach((update)=>task[update]= req.body[update])
    await task.save();
    res.send(task)
    }catch(e){
        res.setHeader('error',400).send(e)
    }
})


router.delete('/tasks/:id', auth ,async(req,res)=>{
    try{
    //const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({_id:req.params.id,owner: req.user._id})
     if(!task)
     {
        res.sendStatus(404).send()
     }

     res.send(task)
    }catch(e){
        res.sendStatus(500).send(e)
    }
})

module.exports = router