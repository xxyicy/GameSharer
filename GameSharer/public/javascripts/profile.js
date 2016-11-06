var profile = profile || {};

$(document).ready(function() {
  profile.fetchUserInfo();
  profile.enableButtons();
})

profile.fetchUserInfo = function() {
  $.ajax({
    url: "users/profile",
    type: "GET",
    dataType: "JSON",
    success: function(data) {
      if (data.succ) {
        profile.renderData(data.result);
      } else {
        alert(data.result);
      }
    },
    error: function(response, status, error) {
      alert("server error")
    }
  })
}

profile.enableButtons = function() {
  $("#update-profile-btn").click(function() {
    $.ajax({
      url: "/users/profile",
      type: "POST",
      dataType: "JSON",
      data: profile.readData(),
      success: function(data) {
        if (data.succ) {
          alert("user info updated")
          location.reload();
        } else {
          alert(data.result)
        }
      },
      error: function(response, status, error) {
        alert("server error")
      }
    })
  })

  $("#post-item-btn").click(function() {
    $("#post-dialog").fadeToggle();
  })
}

profile.readData = function() {
  //TODO add image
  return {
    email: $("#input-email").val(),
    phoneNumber: $("#input-phone").val(),
    description: $("#user-description").val()
  }
}

profile.renderData = function(data) {
  $("#input-username").val(data.username)
  $("#input-email").val(data.email)
  $("#input-phone").val(data.phoneNumber)
  $("#user-description").val(data.description)
}

