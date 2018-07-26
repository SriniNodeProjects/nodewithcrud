var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
var url = "mongodb://localhost:27017/test";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/add', function(req , res) {
    res.render('add');
});

app.post('/insert', function(req , res) {
    console.log("say something");
    console.log(req.body.fname);
    console.log(req.body.lname);
    res.render('add');
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