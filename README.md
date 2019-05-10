## Drop down navigation ##

### Features ###

* Up to 3 levels
* Label can be link or text
* CSS-only accessibility on mobile and tablet/desktop with touch screen, mouse and tabbing
* Accessibility on mobile and tablet/desktop with touch screen, mouse and tabbing
* Customizable colors with CSS variables
* Customizable chevron with an SVG mask
* Click outside to close
* Supporting dynamic addition of items
* Animation
* Blank design
* Zoomable
* Multi-line labels
* No dependencies
* Only 2 KB CSS + 1.5 KB JS

[Demo](https://radogado.github.io/nav.drop/)

### Structure ###

	<nav class="n-nav n-drop">
		<ul>
			<li> 
				<input type="checkbox">
				<ul>
					<li> 
						<input type="checkbox">
						<ul>
							<li> 
								<a href="link">First item's sub item 1's sub item 1</a>
							</li>
						</ul>
						<a>First item's sub item 1</a>
					</li>
				</ul>
				<a>First item</a>
			</li>
		</ul>
	</nav>

Exported from [natUIve](https://github.com/radogado/natuive)
