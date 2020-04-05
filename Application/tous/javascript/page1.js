$(document).ready(function(){
    $('#company').click(function(){
    $('#company-new').slideToggle(1000);
    });
    $('#info').click(function(){
        $('.childs').slideToggle(1000);
        $(this).text('Hide').click(function(){
            if($(this).text()==='Hide'){
$(this).text('show departement');
            }
else{
    $(this).text('Hide');
}
        });
    });
   
 });
