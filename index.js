const express = require('express');   //import express

const app = express();  // declare express for app

const cors = require('cors');  //import cors

const mongodb = require('mongodb')  //import mongodb

const mongoClient = mongodb.MongoClient;  //declare mongoClient

const URL = "mongodb://localhost:27017";  //declare URL

app.use(express.json());  //middle were

app.use(cors({
    orgin : 'http://localhost:3000'
}))



// let students = [];

// app.get('/students', function(req,res){
//     // res.send("hello world")
//     res.json(students)
// })


app.get('/students', async function(req,res){

    //open connection
try{
    const connection = await mongoClient.connect(URL)
    
    //select db 

    const db = connection.db('b35wd');

    //select collection and operation

      let student = await db.collection('students').find().toArray();

      //close the connection

      await connection.close();

      res.json(student)



}
catch(error){
    console.log(error)
}
})





// app.post('/students', function(req,res)
// {
//     req.body.id = students.length + 1;
//     students.push(req.body);
//     // console.log(req.body)
//     res.json({
//         message:'student added succesfully'
//     })
// })

app.post('/students',async function(req,res){

    //open connection

    const connection = await mongoClient.connect(URL);
    
    // select the dp 

    const db = connection.db('b35wd');

    //select collection and operations

    await db.collection('students').insertOne(req.body);

    //close the connection

    await connection.close();

    res.json({
        message:'student added succesfully'
    })


})




// app.get('/students/:id', function(req,res){
     
//     // console.log(req.params.id)
//     const id = req.params.id;
//     const student = students.find(student => student.id == id);
//     res.json(student);
// })


app.get('/students/:id' , async function(req,res){

    try{
        const connection = await mongoClient.connect(URL);

         const db = connection.db('b35wd');

         let student = await db.collection('students').findOne({_id : mongodb.ObjectId(req.params.id)});


         await connection.close();

         res.json(student);



    }
    catch(error){

    }
})



// app.put('/students/:id', function(req,res){

//     const id = req.params.id;
//     const studentIndex = students.findIndex((student) => student.id == id);
//     students[studentIndex].email = req.body.email;
//     students[studentIndex].password = req.body.password;
    
//     res.json({
//         message:'student updated succesfully'    
//     })
// })
app.put("/students/:id", async function(req,res){

    try{
      const connection = await mongoClient.connect(URL);
      const db = connection.db('b35wd');
    let student =  await db.collection('students').updateOne({_id : mongodb.ObjectId(req.params.id)},{ $set : req.body});

      await connection.close();

      res.json({
        meassage : 'student updated successfully'
      })
    }
    catch(error){
        console.log(error)
    }
})




// app.delete('/students/:id', function(req,res){
       
//     const id = req.params.id;
//     const studentIndex = students.findIndex((student) => student.id == id);
//     students.splice(studentIndex,1);
//     res.json({
//         message : 'Deleted Succesfully'
//     })
// })


app.delete('/students/:id' , async function(req,res){
    
    const connection = await mongoClient.connect(URL);
    
    const db = connection.db('b35wd');

     await db.collection('students').deleteOne({_id : mongodb.ObjectId(req.params.id)})

    await connection.close();

    res.json({
        message : 'student deleted successfully'
    })

})



app.listen(4000)