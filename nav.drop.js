function addClass(el, className) {

    if (el.classList) {
		
        el.classList.add(className);

    } else {

        el.className += ' ' + className;

    }

}

function forEach(selector, fn) { // Accepts both an array and a selector

    elements = (typeof selector == 'string') ? document.querySelectorAll(selector) : selector;
    for (var i = 0; i < elements.length; i++) {

        fn(elements[i], i);

    }

}

function eventElement(e) {
	
	if (e) {
		
		return e.target;

	} else {
		
		return window.event.srcElement;
		
	}

}

if (!('ontouchstart' in window)) { // CSS for no-touch devices

	addClass(document.querySelector('body'), 'no-touch');

}

/* Polyfill to uncheck all radio buttons of a form with form owner attribute. Single set of radios currently, for drop-down menu. */
if (document.querySelector('input[type=reset][form]') && !document.querySelector('input[type=reset][form]').form) {
	
	forEach('input[type=reset][form]', function(el) {

		el.onclick = function (e) { // Assuming a single set of radios per form (for drop down menu)
			
			el = eventElement(e);
			document.querySelector('input[type=radio][form=' + el.getAttribute('form') + ']:checked').checked = false;
			
		};

	});

}
