var express= require('express');

var body_parser= require('body-parser');

var app = express();

app.use(express.static('./tous'));

app.set('view engine','ejs');

app.use(body_parser.urlencoded({extended:false}));

app.use(body_parser.json());

var fs= require('fs');

var list=[];

app.get('/entreprise',(req,resp)=>{
  var wd=fs.readFileSync('./data/Entreprise.json');
list=JSON.parse(wd);


resp.render('pages/Page1',{entreprise:list});

});
app.post('/dep',function(req,resp){
    console.log(req.body);
});

// Ajouter Département  //
app.post('/d',(req,resp)=>{
    console.log(req.body.entreprise);
for(var i in list){
    if(list[i].nom===req.body.entreprise){
    list[i].Département.push({"Nom":req.body.Nom,"chef_département":req.body.chef_département,"description":req.body.description});
}
}
fs.writeFile('./data/Entreprise.json',JSON.stringify(list),(err)=>{
    console.log(err);
});
resp.render('pages/Page1',{entreprise:list});
});





























// Ajouter Entreprise  //
app.post('/entre',(req,resp)=>{
for(var i in list){
    if(list[i].nom===req.body.nom){
        console.log('hello' + list[i].nom + "=" + req.body.nom);
        return list.push();
    }else{
    var t={"nom":req.body.nom,"locals":req.body.locals,"descriptions":req.body.descriptions,
    Département:[{
    "Nom":req.body.Nom,
    "chef_département":req.body.chef_département,
    "description":req.body.description
             }]
            };
    }
}
list.push(t);
fs.writeFile('./data/Entreprise.json',JSON.stringify(list),(err)=>{
    console.log(err);
});
resp.render('pages/Page1',{entreprise:list});
});
app.listen(3320);














// // ------------------------------------------------------------------------------------------- hennnna 
// /*jshint esversion: 6 */

// const express = require('express');
// const bodyParser = require('body-parser')
// const fs = require('fs');
// const uuid = require('uuid');
// const path = require('path');


// const app = express();
// app.use(bodyParser.urlencoded({extended: true}));


// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/login.html");
// });
// app.get('/register', function(req, res){
//     res.sendFile(__dirname + "/register.html");
// });

// app.get('/Salaire', function(req, res){
//     res.sendFile(__dirname + "/index.html");
// });
// app.get('/contactus', function (req, res) {
//     res.sendFile(__dirname + "/formpage.html");
// });

// app.post('/contactus', function (req, res) {
//     var message = req.body.message;
//     var name = req.body.name;
//     var email = req.body.email;
    


//     fs.readFile('contactus.json', 'utf-8', function (err, data) {
//         if (err) throw err;

//         var arrayOfObjects = JSON.parse(data);
//         arrayOfObjects.companies.push({
//             message: message,
//             name: name,
//             email: email,
//         });

//         console.log(arrayOfObjects);

//         fs.writeFile('contactus.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
//             if (err) throw err;
//             console.log('Done!');
//             res.sendFile(__dirname + "/formpage.html");

//         });
//     });

// })

// app.post('/Salaire',function(req, res){
//     var name = req.body.name;
//     var name2 = req.body.name2;
//     var age = req.body.age;
//     var slr = req.body.slr;


// fs.readFile('data.json', 'utf-8', function (err, data) {
// 	if (err) throw err;

// 	var arrayOfObjects = JSON.parse(data);
// 	arrayOfObjects.companies.push({
//         matricule : uuid.v4(),
// 		name: name,
//         name2: name2,
//         age: age,
//         slr: slr
// 	});

//     console.log(arrayOfObjects);
    
//     fs.writeFile('data.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
//         if (err) throw err;
//         console.log('Done!');
//         res.sendFile(__dirname + "/index.html");
  
//     });
// });
    
// });

// app.use("/", express.static(__dirname + "/"));



// // Register validation  ------------------------
// app.post('/register',function(req, res){
//     var name = req.body.name;
//     var mail = req.body.mail;
//     var password = req.body.password;
//     var confirPassword = req.body.confirPassword;


// fs.readFile('./users.json', 'utf-8', function(err, data) {
// 	if (err) throw err

// 	var arrayOfObjects = JSON.parse(data);
// 	arrayOfObjects.push({
// 		name: name,
//         mail: mail,
//         password : password,
//         confirPassword : confirPassword
// 	});

//     // console.log(arrayOfObjects);
    
//     fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
//         if (err) throw err;
//         console.log('Done!');
//         res.sendFile(__dirname + "/page1.html");

        
//     });
// });
    
// });

// app.get('/userss',function(req, res){

//     fs.readFile('./data.json', 'utf-8', function(err, data) {
//         if (err) throw err;
    
//         var arrayOfObjects = JSON.parse(data);
      
//         res.send(arrayOfObjects);
//         console.log(arrayOfObjects);
        
//     });
// })
// app.get('/contactusdata', function (req, res) {

//     fs.readFile('./contactus.json', 'utf-8', function (err, data) {
//         if (err) throw err;

//         var arrayOfObjects = JSON.parse(data);

//         res.send(arrayOfObjects);
//         console.log(arrayOfObjects);

//     });
// })




// // ---------------------------------------------
// // Register validation  ------------------------
// app.post('/',function(req, res){
//     var name = req.body.name;
//     var password = req.body.password;


// fs.readFile('./users.json', 'utf-8', function(err, data) {
// 	if (err) throw err

// 	var arrayOfObjects = JSON.parse(data);
	

//     console.log(arrayOfObjects);

//     arrayOfObjects.forEach(element => {
//         if (name === element.name && password === element.password ) {

//          res.sendFile(__dirname + "/page1.html");

//         }else
//         res.sendFile(__dirname + "/404.html");

        
    
        
//     });
    
// });
    
// })
// // --------------------------------------------






    




// app.listen('3000',function(){
//     console.log("Server listning on port 3000...");
    
// });
// // --------------------------------------------------------------------------------------------