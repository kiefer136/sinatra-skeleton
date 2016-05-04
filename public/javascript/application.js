$(function() {
  $("#userForm").hide();
  $("#button_load").on('click', function() {
    $("#userForm").hide();
    $.getJSON('/users', function(users) {
      var table = $("#stuff").find('tbody').empty();
      users.forEach(function(user) {
        var tr = $("<tr>").addClass('user').appendTo(table);
        $("<td>").appendTo(tr).text(user.name);
        $("<td>").appendTo(tr).text(user.email);
        $("#results").fadeIn('slow');
      });
    });
  });
})
  $("#addUser").on('click', function() {
    $("#results").hide();
    $("#userForm").fadeIn('slow');
});
// $(function() {
//   $("#button_load").click(function() {
//     $.ajax({url:"/users", success: function() {
//       $.get( "/users", function( data ) {
//         var obj = JSON.parse(data);
//         console.log(obj);
//         $.each(obj, function(index, value) {
//           $("#stuff").append(value.name + value.email);  
//         })
//       });
//     }
//   })
// });
// });
//   // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
