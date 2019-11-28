const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const cors = require('cors');
const app = express();
const Post = require('./models/post');

//Connection 
mongoose.connect('mongodb://mongodb-4800-0.cloudclusters.net:10001/abhaydb?authSource=admin', {
    auth: {
        user: 'abhaypurohit10',
        password: 'Password@123',
      },
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//         );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "Get, Post, Patch, Delete, Options"
//     );
//     next();    
// });
app.use(cors());
app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
   
    post.save();

    //Can Write like this
   // res.status(201).json();
    //Or
    res.status(201).json({
        message: "Post Added Successfully"
    });

});




app.get("/api/posts",  (req, res, next) => {
    Post.find().then(documents=>{
        res.status(200).json({
            message: "This post is Working",
            posts: documents
        });
    })
});

app.delete("/api/posts/:id", (req, res, next)=>{
    Post.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({
            message: "This post has been deleted"
        })
    });
})

module.exports = app;
