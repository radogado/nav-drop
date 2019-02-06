// Component Nav – start

(function (){
    
/* Nav – start */

function closestElement(el, target) { // Thanks http://gomakethings.com/ditching-jquery/ – Accepts either a selector string or an actual element

    for ( ; el && el !== document; el = el.parentNode ) {

		if (el === target) {
			
			return el;

		}

    }

    return false;

}

function hasClass(el, className) {

	return el.classList.contains(className);

}

function q(selector) {

	return document.querySelector(selector);

};

	function closeDropNavClickedOutside(e) { // Close the nav when clicking outside
	
		if (!e.target.closest('.n-nav li')) {
	
			qa('.n-nav li').forEach((el) => {
				
				el.removeAttribute('aria-expanded');
				
			});
			
			if (q('.n-nav :focus')) {
	
				q('.n-nav :focus').blur();
			
			}
			
		}
		
	}
	
	function dropNavBlur(e) {
	
		var this_nav = e.target.closest('.n-nav');
		
		if (!closestElement(e.relatedTarget, this_nav)) { // if e.relatedTarget is not a child of this_nav, then the next focused item is elsewhere
			
			this_nav.querySelectorAll('li').forEach((el) => {
	
				el.removeAttribute('aria-expanded');
				
			});
			return;
			
		}
		// Close neighboring parent nav's sub navs.
		var el = e.target;
		var target_parent = el.closest('[aria-haspopup]');
		if (target_parent) { // Skip if it's a top-level-only item
			
			target_parent.querySelectorAll('li[aria-expanded]').forEach((el) => { // Disable active grandchildren
		
				el.removeAttribute('aria-expanded');
		
			});
		
		}
	
		el = e.target.parentNode;
		if (!el.nextElementSibling && // last item
			el.parentNode.parentNode.nodeName === 'LI' && // of third-level nav
			!el.parentNode.parentNode.nextElementSibling) {
				
				el.parentNode.parentNode.removeAttribute('aria-expanded');
		
		}
		
	}
			
	function dropNavFocus(e) {

		if (hasClass(q('html'), 'can-touch') && typeof e.target.href === 'string' && e.target.href.length > 0) {
			
			return;
			
		}

		// Close focused third level child when focus moves to another top-level item
		
		var el = e.target.closest('.n-nav > ul > li');
// To do: on LI focus, make it aria-expanded and focus its a
		[].slice.call(e.target.parentElement.parentElement.children).forEach((item) => {
			
			item.removeAttribute('aria-expanded');
			
		});

		[].slice.call(e.target.parentElement.parentElement.parentElement.parentElement.children).forEach((item) => {

			item.removeAttribute('aria-expanded');
			
		});

		[].slice.call(el.parentElement.children).forEach((item) => {

			item.removeAttribute('aria-expanded');
			
		});

		el.setAttribute('aria-expanded', true);
		
		if (el.parentNode.parentNode.getAttribute('aria-haspopup')) {
			
			el.parentNode.parentNode.setAttribute('aria-expanded', true);
			
		}
		
		// Make current focused item's ancestors visible
		
		el = e.target;
	
		el.parentNode.setAttribute('aria-expanded', true);
		var grand_parent = el.parentElement.parentElement.parentElement;
		if (grand_parent.tagName === 'LI') {
	
			grand_parent.setAttribute('aria-expanded', true);
	
		}
		
	}
	
	var closeDropNavClickedOutsideEnabled = false;
	
	function initNav(el) {
		
		// Delete all trigger inputs, add tabindex=0 to each li
		
		el.querySelectorAll('input').forEach((el) => {
			
			el.outerHTML = '';
			
		});
		
		el.setAttribute('role', 'menubar');
	
		el.querySelectorAll('li > a').forEach((el) => {
			
			el.setAttribute('tabindex', 0);
	
		});
	
		if (!el.closest('.n-nav.n-drop')) { // The rest is for drop nav only
			
			return;
	
		}
	
		if (!closeDropNavClickedOutsideEnabled) {
			
			window.addEventListener('touchend', closeDropNavClickedOutside);
			closeDropNavClickedOutsideEnabled = true;
		
		}
		
		el.addEventListener('keyup', (e) => {
			
			// Check for sibling or children to expand on control keys Left/Right/etc
		
			if (e.key === 'Escape') {
				
				e.target.closest('.n-nav').querySelectorAll('li').forEach((el) => {
					
					el.removeAttribute('aria-expanded');
					
				});
				
				document.activeElement.blur();
				
			}
			
		});
		
		el.querySelectorAll('li').forEach((el) => {
			
			if (el.querySelector('ul')) {
		
				el.setAttribute('aria-haspopup', true);
				if (el.children[0].nodeName === 'UL') {

					el.insertBefore(el.children[1], el.children[0]); // Swap 'a' with 'ul'

				}
			
			}
		
			let tapEvent = (e) => {
	
				e.stopPropagation();

				var el = e.target;
	
				if (draggingNow || (typeof el.href === 'string' && el.href.length > 0)) {
					
					return;
					
				}
				
				e.preventDefault();
				
				if (el.nodeName === 'LI') {
					
					el = el.querySelector('a');
					
				}
				
				if (el === document.activeElement) {
	
					el.blur();
					
					let parent_item = el.parentElement.parentElement.closest('li[aria-haspopup]');
					if (parent_item) {
						
						parent_item.querySelector('a').focus();
						
					}
	
				} else {

					if (el.parentElement.getAttribute('aria-expanded')) { // Click on an open element which isn't in focus
						
						el.parentElement.removeAttribute('aria-expanded');
						document.activeElement.blur();
						el.querySelectorAll('[aria-expanded]').forEach((item) => {
							
							item.removeAttribute('aria-expanded');
							
						});
						
					} else {
						
						// Opening an item should close its open siblings
						[].slice.call(el.parentElement.parentElement.children).forEach((item) => {
							
							item.removeAttribute('aria-expanded');
							if (item !== el.parentElement) {
								
								let old_item_open_child = item.querySelector('[aria-expanded]');
								if (old_item_open_child) {
									
									old_item_open_child.removeAttribute('aria-expanded');

								}
								
							}
							
							
						});
						el.focus();
						el.parentElement.setAttribute('aria-expanded', true);

					}
				
				}
					
			};
		
			el.addEventListener('touchend', tapEvent);
			el.addEventListener('mousedown', (e) => {
				
				e.stopPropagation();
				// To do: also ancestors, also close when open
				let el = e.target;
				
				if (el.getAttribute('aria-expanded')) {
					
					if (el.querySelector('a:focus')) {
						
// 						el.querySelector('a:focus').blur();
						
					} else {

						el.removeAttribute('aria-expanded');

					}
					
				} else {
					
					[].slice.call(el.parentElement.children).forEach((item) => {
						
						item.removeAttribute('aria-expanded');
						let old_item_open_child = item.querySelector('[aria-expanded]');
						if (old_item_open_child) {
							
							old_item_open_child.removeAttribute('aria-expanded');

						}
					
					});

					el.setAttribute('aria-expanded', true);
				
				}
				
			});
	
			var anchor = el.querySelector('a');
	
			anchor.addEventListener('focus', dropNavFocus);
		
			anchor.addEventListener('blur', dropNavBlur);
			
		});
	
		draggingNow = false;
	
	}
	
/* Nav – end */

	document.querySelectorAll('.n-nav:not([data-ready]) > ul:not([role])').forEach((el) => {
		
		initNav(el);
		el.closest('.n-nav').setAttribute('data-ready', true);
		
	});

})();

// Component Nav – end
