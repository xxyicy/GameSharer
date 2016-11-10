var itemDetail = itemDetail || {};
itemDetail.data = null;

$(document).ready(function () {
  itemDetail.fetchItemDetailAndPosterInfo();
})

itemDetail.fetchItemDetailAndPosterInfo = function (itemId, div) {
  var itemId = getUrlParameter('itemId');
  console.log(itemId);
  if (!itemId) {
    window.location = "/";
  }
  $.ajax({
    url: "/items/detail",
    data: { itemId: itemId },
    type: "GET",
    dataType: "JSON",
    success: function (data) {
      if (data.succ) {
        itemDetail.data = data.result;
        itemDetail.renderData(data.result);
      } else {
        alert(data.result);
        window.location = "/";
      }
    },
    error: function (response, status, error) {
      alert("server error")
    }
  })
}

itemDetail.renderData = function (data) {
  $(".detail-title").text(data.name);
  $("#img-avatar").attr("src", "/img/" + data.picUrl);
  $("#input-category").val(data.category);
  $("#input-purpose").val(data.purpose);
  $("#input-price").val(data.price);
  $("#input-username").val(data.username);
  $("#input-email").val(data.email);
  $("#input-phone").val(data.phone);
  $("#item-description").text(data.description);
  if (data.isBelongTo) {
    $(".detail-btn-container").show();
    $("#edit-item-btn").click(function () {
      itemDetail.editMode(data);
    })

    $("#delete-item-btn").click(function () {
      itemDetail.deleteItem();
    })
  }
}

itemDetail.editMode = function (data) {
  $("#input-price").attr("readonly", false);
  $("#edit-item-btn").replaceWith('<button id="update-item-btn">Update</button>');
  $("#delete-item-btn").replaceWith('<button id="cancel-item-btn">Cancel</button>');
  $("#input-category").replaceWith('<select id="category-select"><option value="game">game</option><option value="console">console</option></select>');
  $("#category-select").val(data.category);
  $("#input-purpose").replaceWith('<select id="purpose-select"><option value="exchange">exchange</option><option value="rent">rent</option><option value="sale">sale</option></select>');
  $("#purpose-select").val(data.purpose);
  $("#item-description").attr('contenteditable', 'true');
  $(".detail-title").attr('contenteditable', 'true');

  $("#cancel-item-btn").click(function () {
    itemDetail.rerenderData(data);
  });
  $("#update-item-btn").click(function () {
    itemDetail.updateDetail();
  })
}

itemDetail.rerenderData = function (data) {
  $("#update-item-btn").replaceWith('<button id="edit-item-btn">Edit</button>');
  $("#cancel-item-btn").replaceWith('<button id="delete-item-btn">Delete</button>');
  $("#category-select").replaceWith('<input type="text" id="input-category" readonly/>');
  $("#purpose-select").replaceWith('<input type="text" id="input-purpose" readonly/>');
  $("#item-description").attr('contenteditable', 'false');
  $(".detail-title").attr('contenteditable', 'false');
  $(".detail-title").text(data.name);
  $("#input-category").val(data.category);
  $("#input-purpose").val(data.purpose);
  $("#input-price").val(data.price);
  $("#input-username").val(data.username);
  $("#input-email").val(data.email);
  $("#input-phone").val(data.phone);
  $("#item-description").text(data.description);
  $("#edit-item-btn").click(function () {
    itemDetail.editMode(data);
  })
  $("#delete-item-btn").click(function () {
    itemDetail.deleteItem();
  })
}

itemDetail.updateDetail = function () {
  var item = {
    _id: itemDetail.data._id,
    name: $(".detail-title").text(),
    price: $("#input-price").val(),
    purpose: $("#purpose-select").val(),
    category: $("#category-select").val(),
    description: $("#item-description").text(),
  };

  console.log(item);

  $.ajax({
    url: "/items/update",
    data: item,
    type: "PUT",
    dataType: "JSON",
    success: function (data) {
      if (data.succ) {
        window.location = "/detail?itemId=" + data.result._id;
      } else {
        alert(data.result);
        window.location = "/";
      }
    },
    error: function (response, status, error) {
      alert("server error")
    }
  })
};

itemDetail.deleteItem = function () {

  $.ajax({
    url: "/items/delete",
    data: { _id: itemDetail.data._id },
    type: "DELETE",
    dataType: "JSON",
    success: function (data) {
      alert(data.result);
      window.location = "/";
    },
    error: function (response, status, error) {
      alert("server error")
    }
  })
}