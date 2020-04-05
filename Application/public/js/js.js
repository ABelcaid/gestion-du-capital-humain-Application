/*jshint esversion: 6 */
$(document).ready(function(){
  
    $.ajax({
        method : 'GET',
        url:'http://localhost:3000/api/departement/',
        dataType: 'json'
    }).done(function(data){
        console.log(data);
            $("#name").html(data.name);
            $("#head").html(data.chef_departement);
            $("#desc").html(data.description);
      });
    
          


   















 

});