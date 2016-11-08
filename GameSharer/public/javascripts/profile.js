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
        window.location = "/"
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
      contentType: false,
      processData: false,
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

  $("#my-posts-btn").click(function(){
    window.location.href = "/my-post";
  })

  $("#post-item-btn").click(function() {
    $("#post-dialog").fadeToggle();
  })

  $("#img-avatar").click(function() {
    $("#input-avatar").click();
  })

  $("#input-avatar").change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader()
      reader.onload = function(e) {
        $("#img-avatar").attr("src", e.target.result)
      }
      reader.readAsDataURL(this.files[0])
    }
  })
}

profile.readData = function() {
  var formData = new FormData();
  formData.append("email", $("#input-email").val())
  formData.append("phoneNumber", $("#input-phone").val())
  formData.append("description", $("#user-description").val())
  var input = $("#input-avatar");
  if (input[0] && input[0].files && input[0].files[0]) {
    formData.append("avatar", $("#input-avatar")[0].files[0])
  }
  return formData;
}

profile.renderData = function(data) {
  console.log(data)
  $("#input-username").val(data.username)
  $("#input-email").val(data.email)
  $("#input-phone").val(data.phoneNumber)
  $("#user-description").val(data.description)
  if (data.avatarUrl) {
    $("#img-avatar").attr("src", "/img/" + data.avatarUrl)
  }
}

