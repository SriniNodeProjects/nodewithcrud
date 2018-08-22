var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var mydb;
var app = express();
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
var url = "mongodb://localhost:27017/test";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
mongoose.connect(url, {useNewUrlParser: true}, function (err, db) {
    mydb = db;
    if (err) {
        console.log("error:" + err);
        return
    }
});
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/add', function(req , res) {
    res.render('add');
});

app.post('/insert', function(req , res) {
  if(req.body.pwd == req.body.conformpwd) {


            let hash = bcrypt.hashSync('req.body.pwd', 10);
            const user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                phno: req.body.phno
            }
            mydb.collection("members").insertOne(user, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                mydb.close();
            });


        res.render('add');
    }
    else
    {
        res.render('add',{passwordmismatch:'Password and conform password wrong'});

    }

});

app.post('/login', function(req , res) {

});

app.get('/show', function(req , res) {

       mydb.collection("members").find({}).toArray(function(err, result) {
            if (err) {
                console.log("error:" + err);
                return
            }
            console.log(res);
            res.render('show',{memberdata:result});

            mydb.close();
        });


});




//mongoose.connect(url, { useNewUrlParser: true } ,function(err, db) {
  //  if (err){ console.log("error:"+err);return}
    //console.log("Database created!");
   //const user={name:'swarup',dept:'it',age:23}
    //db.collection("people").insertOne(user, function(err, res) {
      //  if (err) throw err;
        //console.log("1 document inserted");
        //db.close();
    //});

//});

app.listen(8000, function() {
    console.log('listening on 8000')
})