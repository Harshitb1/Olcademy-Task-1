var express = require("express"),
    app= express(),
    bodyParser= require("body-parser"),
    mongoose= require("mongoose");
    var moment = require('moment');
    


mongoose.connect("mongodb://localhost/signup_app");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));


var userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    bday: Date,
    gender: String,
    created : {type :Date , default: Date.now}
}); 

var User = mongoose.model("User",userSchema);

app.listen(8000, function(){
    console.log("User Signup app running");
});


app.get("/", function(req,res){
    res.redirect("/user/new");
});

app.get("/user", function(req,res){
    User.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs: blogs,moment:moment});
        }
    });
});

app.post("/user",function(req,res){
    User.create(req.body.user,function(err,newUser){
        if(err){
            console.log(err);
            res.render("signup");
        }
        else{
            res.redirect("/user"); 
        }
    });
});
app.get("/user/new", function(req,res){
    res.render("signup");
});
