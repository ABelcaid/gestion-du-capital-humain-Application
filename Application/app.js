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