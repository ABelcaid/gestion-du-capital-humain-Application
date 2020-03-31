/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.sendFile(__dirname + "/login.html");
});
app.get('/register', function(req, res){
    res.sendFile(__dirname + "/register.html");
});

app.get('/Salaire', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/Salaire',function(req, res){
    var name = req.body.name;
    var name2 = req.body.name2;
    var age = req.body.age;
    var slr = req.body.slr;


fs.readFile('data.json', 'utf-8', function (err, data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);
	arrayOfObjects.companies.push({
		name: name,
        name2: name2,
        age: age,
        slr: slr
	});

    console.log(arrayOfObjects);
    
    fs.writeFile('data.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err;
        console.log('Done!');
        res.sendFile(__dirname + "/index.html");
  
    });
});
    
});

app.use("/", express.static(__dirname + "/"));



// Register validation  ------------------------
app.post('/register',function(req, res){
    var name = req.body.name;
    var mail = req.body.mail;
    var password = req.body.password;
    var confirPassword = req.body.confirPassword;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data);
	arrayOfObjects.push({
		name: name,
        mail: mail,
        password : password,
        confirPassword : confirPassword
	});

    // console.log(arrayOfObjects);
    
    fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err;
        console.log('Done!');
        res.sendFile(__dirname + "/page1.html");

        
    });
});
    
});
// ---------------------------------------------
// Register validation  ------------------------
app.post('/',function(req, res){
    var name = req.body.name;
    var password = req.body.password;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data);
	

    console.log(arrayOfObjects);

    arrayOfObjects.forEach(element => {
        if (name === element.name && password === element.password ) {

         res.sendFile(__dirname + "/page1.html");

        }else
        res.sendFile(__dirname + "/404.html");

        
    
        
    });
    
});
    
})
// --------------------------------------------


app.listen('3000',function(){
    console.log("Server listning on port 3000...");
    
});