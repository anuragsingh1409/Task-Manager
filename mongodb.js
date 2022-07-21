// CRUD create read update delete

const mongodb = require('mongodb')
const MongoCLient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId

//const {MongoCLient, ObjectID}= require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' 

// const id = new ObjectID()
// console.log(id.id.length) 
// // console.log(id.getTimestamp())
// console.log(id.toHexString().length)


MongoCLient.connect(connectionURL, {useNewUrlParser: true},(error,client)=>{
    if(error)
    {
       return  console.log('Unable to connect to the database!')
    }
    
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Anurag',
    //     age : 20

    // }, (error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to enter user!')
    //     }

    //     console.log(result)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Anurag',
    //         age: 19
    //     },{
    //         name:'Aandrew',
    //         age: 23
    //     }
    // ],(error,result)=>{
    //     if(error)
    //     {
    //        return console.log('Unable to enter user!')
    //     }
    //     console.log(result)
    // })

   //  db.collection('task1').insertMany([
   //      {
   //          description: 'The first task is to run',
   //          completed: true
   //      },{
   //          description: 'The next task is to eat',
   //          completed: false
   //      },{
   //          description:'The last task is to sleep',
   //          completed: true
   //      }
   //  ],(error,result)=>{
   //      if(error)
   //      {
   //          return console.log('Enter correct task!')
   //      }

   //      console.log(result)
   //  })
    

   //  db.collection('users').findOne({_id: new ObjectID("62ad7ccfff67677f94352bc6")},(error,user)=>{
   //     if(error)
   //     {
   //      return console.log('Unable to find user!')
   //     }

   //     console.log(user)
   //  })
   //  db.collection('users').find({age: 19}).toArray((error,users)=>{
   //    console.log(users)
   //  })
   //  db.collection('users').find({age:19}).count((error,count)=>{
   //    console.log(count)
   //  })
   // db.collection('task1').findOne({_id: new ObjectID("62ad7cd94cbf240e4ec43caf")},(error,task)=>{
   //    if(error)
   //    {
   //       return console.log('Unable to fetch data!')
   //    }

   //    console.log(task)
   // })

   // db.collection('task1').find({completed: false}).toArray((error,task)=>{
   //    console.log(task)
   // })


//  UPDATE (CRUD)

   // const doUpdatePromise = db.collection('users').updateOne({
   //    _id: new ObjectID('62ab56473d6ca5ecb6f87bf0')
   // },{
   //    $set:{
   //       name: 'Mike'
   //    }
   // })

   // doUpdatePromise.then((result)=>{
   //    console.log(result)
   // }).catch((error)=>{
   //    console.log(error)
   // })
  
   // db.collection('users').updateOne({
   //    _id: new ObjectID('62ab56473d6ca5ecb6f87bf0')
   // },{
   //    // $set:{
   //    //    name: 'Mike'
   //    // }

   //    $inc:{
   //       age: 2
   //    }
   // }).then((result)=>{
   //    console.log(result)
   // }).catch((error)=>{
   //    console.log(error)
   // })


   // update many method

   // db.collection('task1').updateMany({
   //    completed: false
   // },{
   //    $set:{
   //       completed: true
   //    }
   // }).then((result)=>{
   //    console.log(result.modifiedCount)
   // }).catch((error)=>{
   //    console.log(error)
   // })

   // delete many method

   // db.collection('users').deleteMany({
   //    age: 19
   // }).then((result)=>{
   //    console.log(result)
   // }).catch((error)=>{
   //    console.log(error)
   // })

   //delete one method

   db.collection('task1').deleteOne({
      _id: new ObjectID('62ad7cd94cbf240e4ec43cb0')
   }).then((result)=>{
      console.log(result)
   }).catch((error)=>{
      console.log(error)
   })

})