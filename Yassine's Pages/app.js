const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/',function(req, res){
    var name = req.body.name;
    var name2 = req.body.name2;
    var age = req.body.age;
    var slr = req.body.slr;


fs.readFile('data.json', 'utf-8', function (err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data)
	arrayOfObjects.companies.push({
		name: name,
        name2: name2,
        age: age,
        slr: slr
	})

    console.log(arrayOfObjects);
    
    fs.writeFile('data.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
        res.sendFile(__dirname + "/index.html");
  
    })
})
    
})

app.use("/", express.static(__dirname + "/"));

app.listen('3000',function(){
    console.log("Server listning on port 3000...");
    
})