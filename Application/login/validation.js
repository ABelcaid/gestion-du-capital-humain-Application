var nom= document.getElementById("username");
var email=document.getElementById("mail"); 
var password= document.getElementById("password");



function send(){
    if(nom.value==="" || email.value==="" || password.value===""){
        alert("Fill in all fields !!!");
        return false;

    }
    else{
       return true;
    }
        
}