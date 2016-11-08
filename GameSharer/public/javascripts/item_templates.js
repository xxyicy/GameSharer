var item_template = _.template(`
        <div class="item_div">
			<h3 class="item_title"><%= name %></h3>
			<hr>
			<p class="item_description"><%= description %></p>
			<div class="item_image">
				<img  src="/img/<%=picUrl %>" />
			</div>
		</div>`)
