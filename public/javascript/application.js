$(function() {
  $("#userForm").hide()
  var handlers = {
    showUser: function(users) {
      var table = $("#stuff").find('tbody').empty();
      var fields = ["email", "name"];
      $("#userForm").hide();
      users.forEach(function(user) {
        var tr = $("<tr>").appendTo(table);
        fields.forEach(function(field) {
          $("<td>").text(user[field]).appendTo(tr);
        });
        $("<td>").html("&times;").css({color: 'red', cursor: 'pointer'}).addClass('delete').data('userID', user.id).appendTo(tr);
      });

      $("#results").show();
    },
    loadUsers: function() {
      $.getJSON('/users', handlers.showUser);
      },
    addUsers: function() {
      $("#results").hide();
      $("#userForm").show();
    },
    newUser: function(event) {
      event.preventDefault();
      var name = $("#input_name").val();
      var email = $("#input_email").val();
      console.log(name + email)
      if (email == '' || name == '') {
        alert("You suck at filling out forms.");
      } else {
        $.post('/users', {name: name, email: email}, handlers.postUser, 'json'); 
      }
    },
    postUser: function(results) {
      if (results.result) {
        alert("User successfully added.");
        $("#newPlayer")[0].reset();
      } else {
        alert("You suck at adding users.");
      }
    }
  };
  $("#button_load").on('click', handlers.loadUsers);

  $("#addUser").on('click', handlers.addUsers);

  $("#newPlayer").on('submit', handlers.newUser);

  $("#stuff").on('click', '.delete', function() {
    var row = $(this).parents('tr');
    var id = $(this).data('userID');
    $.getJSON('/users/'+id+'/delete', function(result) {
      if (result.result) {
        alert("User deleted");
        row.remove();
      } else {
        alert("You suck.");
      }
    });
  });
});