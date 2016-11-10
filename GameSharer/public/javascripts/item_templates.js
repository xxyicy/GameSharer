var item_template = _.template(`
        <div class="item_div">
			<h3 class="item_title"><%= name %></h3>
			<input id="itemID" value="<%= _id %>" style="display: none">
			<hr>
			<p class="item_description"><%= description %></p>
			<div class="item_image">
				<img  src="/img/<%=picUrl %>" />
			</div>
		</div>`)

var script_template = _.template('<script>var itemCards = $(".item_div");itemCards.each(function () { $(this).click(function(){if (!$.cookie("uid")){ alert("Please Login"); return;}; var itemId=$(this).find("#itemID").val(); window.location = "/detail?itemId="+itemId;});});</script>')