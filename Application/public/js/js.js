/*jshint esversion: 6 */
$(document).ready(function(){
  
    $.ajax({
        method : 'GET',
        url:'http://localhost:3000/database',
        dataType: 'json'
    }).done(function(data){
        console.log(data);
        $.map(data, function(post ,i){
            // console.log(post.companyName);

            $('#incontainer').append(
                `<div class="col-md-4">
                <div class="card text-center" style="width: 18rem;">
                  <img class="card-img-top" src="${post.companyLogo}" alt="Card image cap">
                  <div class="card-body">
                      <h5 class="card-title">${post.companyName}</h5>
                      <button type="button" id="${post.id}" class="btn btn-primary ">More details</button>

                    </div>
                  </div>
              </div>`
            );
            
                
                
              

          
            $("#" +post.id).click(function (e) { 
              $("#section2").append(
                `<div>
                <p>Nom : ${post.companyName}</p>
                <p>local : ${post.companyLocal}</p>
                <p>description : ${post.companyDescription}</p>
                <h2>liste des départements</h2>
                
                
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                    <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                    <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                    <a href="#" class="list-group-item list-group-item-action ">Vestibulum at eros</a>
                  </div>
                </div>`

                
              );
              console.log(post.companyDepartement);

            });

    });


   















  });

});