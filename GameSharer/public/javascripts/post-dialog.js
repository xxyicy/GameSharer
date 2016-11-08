var postDialog = postDialog || {};
postDialog.apiUrl = "/items/"

$(document).ready(function() {
  postDialog.enableButtons();

})

postDialog.enableButtons = function() {
  $("#post-img-btn").click(function() {
    $("#item-image").click();
  })

  $("#item-image").change(function() {
    if (this.files && this.files[0]) {
      $("#post-img-btn").html(this.files[0].name)
    }
  })

  $("#post-cancel").click(function() {
    $("#post-dialog").fadeToggle();
  })

  $("#post-submit").click(function() {
    var data = postDialog.readData();
    if (postDialog.validateData(data)) {
      $.ajax({
        type: "POST",
        url: postDialog.apiUrl,
        data: data,
        dataType: "JSON",
        contentType: false,
        processData: false,
        success: function(data) {
          if (data.succ) {
            alert("post succeeded")
            window.location = "/"
          } else {
            alert(data.result)
          }
        },
        error: function(request, status, error) {
        }
      })
    }
  })
}

postDialog.validateData = function(data) {
  console.log(data);
  if (!data.get("name")) {
    alert("missing name")
    return false;
  }
  if (!data.get("price")) {
    alert("missing price")
    return false;
  }
  if (!data.get("description")) {
    alert("missing description")
    return false;
  }
  return true;
}

postDialog.readData = function() {
  var formData = new FormData();
  formData.append("name", $("#item-title").val())
  formData.append("purpose", $("#purpose-select").val())
  formData.append("category", $("#category-select").val())
  formData.append("price", Number($("#item-price").val()))
  formData.append("description", $("#item-description").val())
  var input = $("#item-image");
  if (input[0] && input[0].files && input[0].files[0]) {
    formData.append("itemPic", input[0].files[0])
  }
  return formData
}
