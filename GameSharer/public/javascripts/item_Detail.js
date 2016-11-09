var itemDetail = itemDetail  || {};

$(document).ready(function() {
  itemDetail.fetchItemDetailAndPosterInfo();
})

itemDetail.fetchItemDetailAndPosterInfo = function(itemId, div) {
    var itemId = getUrlParameter('itemId');
    console.log(itemId);
    if (!itemId){
      window.location = "/";
    }
    $.ajax({
    url: "/items/detail",
    data: {itemId: itemId},
    type: "GET",
    dataType: "JSON",
    success: function(data) {
      if (data.succ) {
        itemDetail.renderData(data.result);
      } else {
        alert(data.result);
        window.location = "/";
      }
    },
    error: function(response, status, error) {
      alert("server error")
    }
  })
}

itemDetail.renderData = function(data){
    $(".detail-title").text(data.name);
    $("#img-avatar").attr("src", "img/"+data.avatarUrl);
    $("#input-category").val(data.category);
    $("#input-purpose").val(data.purpose);
    $("#input-price").val(data.price);
    $("#input-username").val(data.username);
    $("#input-email").val(data.email);
    $("#input-phone").val(data.phone);
    $("#item-description").text(data.description);
}