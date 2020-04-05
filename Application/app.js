/*jshint esversion: 6 */

const express= require('express');
const uuid = require('uuid');
const body_parser= require('body-parser');
const fs= require('fs');
const path = require('path');


const app = express();
app.use(express.static('./tous'));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine','ejs');

app.use(body_parser.urlencoded({extended:false}));

app.use(body_parser.json());


let list=[];
let currentDepatment = {};


app.get('/entreprise',(req,resp)=>{
  var wd=fs.readFileSync('Entreprise.json');
list=JSON.parse(wd);
resp.render('pages/Page1',{list});
});
app.post('/dep',function(req,resp){
    console.log(req.body);
});

// Ajouter Département  //
app.post('/d',(req,resp)=>{
    console.log(req.body.entreprise);
for(var i in list){
    if(list[i].nom===req.body.entreprise){
    list[i].Departement.push({
        "Nom":req.body.Nom,
    "chef_departement":req.body.chef_departement,
    "description":req.body.description,
});
}
}
        //console.log('list' +JSON.stringify(list));
fs.writeFile('Entreprise.json',JSON.stringify(list),(err)=>{
    console.log(err);
});
resp.render('pages/Page1',{list});
});
// Ajouter Entreprise  //
app.post('/entre',(req,resp)=>{
    var t={
    "id":list.length+1,
    "nom":req.body.nom,
    "locals":req.body.locals,
    "descriptions":req.body.descriptions,
    "Departement":[{
        "id" : uuid.v4(),
    "Nom":req.body.Nom,
    "chef_departement":req.body.chef_departement,
    "description":req.body.description
    }],
    "employees" : []

            };
list.push(t);
fs.writeFile('Entreprise.json',JSON.stringify(list,null,5),(err)=>{
    console.log(err);
});
resp.render('pages/Page1',{list});
});

// ------------------login page -------------------------

app.get('/', function(req, res){
    res.sendFile(__dirname + "/singin.html");
});
app.get('/register', function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


// // Register validation  ------------------------
app.post('/register',function(req, res){
    var name = req.body.name;
    var mail = req.body.mail;
    var password = req.body.password;
    var confirPassword = req.body.confirPassword;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err;

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
        // res.sendFile(__dirname + "/page1.html");
        res.render('pages/Page1',{list});



    });
});

});


// // ---------------------------------------------
// // Register login  ------------------------
app.post('/',function(req, res){
    var name = req.body.name;
    var password = req.body.password;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);


    console.log(arrayOfObjects);

    arrayOfObjects.forEach(element => {
        if (name === element.name && password === element.password ) {

        //  res.sendFile(__dirname + "/page1.html");
        res.render('pages/Page1',{list});


        }else
        res.sendFile(__dirname + "/404.html");




    });

});

});
// // --------------------------------------------
//get the departement info
app.get('/departement', (req, res) => {

    fs.readFile("Entreprise.json", (err, data) => {
        
    if (err) {
        return console.error(err);
    } else {
        const entreprices = JSON.parse(data);
        for (let e = 0; e < entreprices.length; e++) {
            for (let d = 0; d < entreprices[e].Departement.length; d++) {
                if (entreprices[e].id === +req.query.entId &&
                    entreprices[e].Departement[d].id === +req.query.depId) {

                    currentDepatment = entreprices[e].Departement[d];
                    currentDepatment.entrepriceID = entreprices[e].id;
                    currentDepatment.entrepriceName = entreprices[e].nom;

                    res.redirect('/page2.html');
                    return;
                }
            }
        }
    }



        
    });
});



app.get('/api/departement/', (req, res) => {
    res.send(currentDepatment);
});

app.get('/Salaire', function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.get('/contactus', function (req, res) {
    res.sendFile(__dirname + "/formpage.html");
});

app.post('/contactus', function (req, res) {
    var message = req.body.message;
    var name = req.body.name;
    var email = req.body.email;
    


    fs.readFile('contactus.json', 'utf-8', function (err, data) {
        if (err) throw err;

        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.companies.push({
            message: message,
            name: name,
            email: email,
        });

        console.log(arrayOfObjects);

        fs.writeFile('contactus.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
            if (err) throw err;
            console.log('Done!');
            res.sendFile(__dirname + "/formpage.html");

        });
    });

})

app.post('/Salaire',function(req, res){
    var name = req.body.name;
    var name2 = req.body.name2;
    var age = req.body.age;
    var slr = req.body.slr;


fs.readFile('data.json', 'utf-8', function (err, data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);
	arrayOfObjects.companies.push({
        matricule : arrayOfObjects.companies.length +1 ,
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












app.listen(3000,function(){
    // run server on http://localhost:3000/
    console.log("Server listing on port 3000...");
});


