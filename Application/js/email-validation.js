document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
  });

  var nom= document.getElementById("nom");
  var email=document.getElementById("email"); var password= document.getElementById("password");
  var emails=document.getElementById("emails"); var passwords= document.getElementById("passwords");
  var regNom= /[a-zA-Z]{5,8}/;
  var regEmail= /\w+@\w+\.(net|com|fr)/;
  var regpassword= /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!?])[a-zA-Z0-9@!?]{8,}/;
  function validInscris(){
      if(nom.value==="" || email.value==="" || password.value===""){
          alert("remplir tous les champs");
      }
      else
        alert("WELCOME");
    }

    function validlogin(){
        if(emails.value==="" || passwords.value===""){
            alert("remplir tous les champs");
        }
        else
          alert("WELCOME");
      }
      function inputchamp(_champ,_regexp){
          if(_champ.value===""){
              _champ.style.borderColor="red";
          }
          else if(_champ.value!="" && !_regexp.test(_champ.value)){
            _champ.style.borderColor="red";
          }
          else{
            _champ.style.borderColor="green";
          }
      }