var postDialog = postDialog || {};


$(document).ready(function() {
  postDialog.enableButtons();

})

postDialog.enableButtons = function() {
  $("#post-img-btn").click(function() {
    $("#item-image").click();
  })

  $("#post-submit").click(function() {
    var data = postDialog.readData();
    if (postDialog.validateData(data)) {
      //TODO ajax call to backend
    } else {
      alert("Error reading input data (some of them are left empty)")
    }
  })
}

postDialog.validateData = function(data) {
  console.log(data);
  if (!data.name || !data.purpose || !data.category || !data.price || !data.description) {
    return false;
  }
  return true;
}

postDialog.readData = function() {
  var title = $("#item-title").val();
  var purpose = $("#purpose-select").val();
  var category = $("#category-select").val();
  var price = $("#item-price").val();
  var description = $("#item-description").val();
  return {
    name: title,
    purpose: purpose,
    category: category,
    price: price,
    description: description
  }
}
