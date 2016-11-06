var item_template = _.template(`
        <div class="item_div">
			<h4 class="title"><%= title %></h4>
			<hr>
			<p class="description"><%= description %></p>
			<div class="item_image">
				<img  src=""  height="130" width="130" />
			</div>
		</div>`)