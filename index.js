
var currentWidth
var staggerAnim

gsap.registerPlugin(ScrollTrigger)

/**
 * Setting up stagger animation for download item
 */
const setStaggerAnimation = () => {
	ScrollTrigger.refresh()

	//  start animation values
	const fromValues = {
		opacity: 0,
		y: -50
	}

	//  end animation values
	const toValues = {
		opacity: 1,
		y: (index) => {
			//  If laptop size
			//  Display in declining pattern
			if (currentWidth >= 1020)
				return index * 50

			// Else, keeps all cards in same row
			return 0
		},
		stagger: {
			each: 0.2,
			amount: 1
		}
	}

	gsap.set('.download__item', fromValues)

	ScrollTrigger.batch('.download__item', {
		trigger: '.download',
		onEnter: (elements) => {
			gsap.to(elements, toValues)
		},
		onEnterBack: (elements) => {
			gsap.to('.download__item', toValues)
		},
		onLeave: (elements) => {
			gsap.set(elements, fromValues)
		},
		onLeaveBack: (elements) => {
			gsap.set('.download__item', fromValues)
		}
	})
}

var resizeTimeout = null

/**
 * Set listener for resize event
 * Update currentWidth variable
 */
const setResizeListener = () => {
	currentWidth = window.innerWidth
	window.addEventListener('resize', event => {
		currentWidth = window.innerWidth

		//  Clear resizeTimeout if not null
		resizeTimeout && clearResizeTimeout()

		/**
		 * Only allow animation to run when resize ends for 2 seconds
		 */
		resizeTimeout = setTimeout(() => {
			clearResizeTimeout()
			setStaggerAnimation()   // Play animation // Re-position cards
		}, 2000)
	})
}

/*
 * Clear resizeTimeout 
 * Set resizeTimeout = null
*/
const clearResizeTimeout = () => {
	clearTimeout(resizeTimeout)
	resizeTimeout = null
}

setStaggerAnimation()
setResizeListener()

const tabs = document.querySelectorAll('.features__tab')
const panels = document.querySelectorAll('.features__tabpanel')
const tabList = document.querySelector('.features__tabs')

/**
 * Handle tab click event
 * Show tabpanel of clicked tab
 * @param  {object} event
 */
const handleTabClick = (event) => {
	const tab = event.target
	const panelId = tab.getAttribute('aria-controls')

	selectTab(tab)
	showPanel(panelId)
}

var prevTabInd  // Update current tab position when tab is navigated using keyboard

/**
 * Handle tab key pressed event
 * Allows navigation of tabs via arrow key
 * E.g. 
 * Press right arrow key, moves focus to next tab
 * Press left arrow key, moves focus to prev tab
 * @param  {object} event
 */
const handleTabKey = (event) => {
	const key = event.keyCode
	const tabsArray = Array.from(tabs)
	const tabsLength = tabsArray.length

	let nextInd = prevTabInd

	switch (key) {
		// Left arrow
		case 37:
			nextInd--   // move to left by 1
			break
		// Right arrow
		case 39:
			nextInd++   // move to right by 1
			break
		default:
			break
	}

	/**
	 * Keeps focus within tabs range
	 * Prevent out of bounds 
	 */

	// Set nextInd to first tab if exceeds tabs length/size
	if (nextInd > tabsLength - 1)
		nextInd = 0
	//  Set nextInd to last tab if negative index
	else if (nextInd < 0)
		nextInd = tabsLength - 1

	// Only focus on tab if nextInd changes
	nextInd !== prevTabInd && tabsArray[nextInd].focus()

	prevTabInd = nextInd
}

/**
 * Hide all tabpanels
 */
const hidePanels = () => {
	for (let panel of panels) {
		panel.setAttribute('hidden', '');
	}
}

/**
 * Show tabpanel with id
 * @param  {string} id
 */
const showPanel = (id) => {
	hidePanels()

	const panel = document.querySelector(`#${id}`)
	panel.removeAttribute('hidden')
	panel.focus()
}

/**
 * Add keyup listener to .features section
 */
const addKeyListenerToTab = () => {
	const currentTab = document.querySelector('.features__tab[aria-selected="true"]')
	const tabInd = Array.from(tabs).indexOf(currentTab)
	const featuresSection = document.querySelector('.features')

	prevTabInd = tabInd // initialize prevTabInd
	featuresSection.addEventListener('keyup', event => handleTabKey(event))
}

/**
 * Unselect all tabs
 */
const clearSelectedTabs = () => {
	for (let tab of tabs) {
		tab.setAttribute('aria-selected', false)
		tab.setAttribute('tab-index', -1)
	}
}

/**
 * Select tab
 * @param  {object} tab
 */
const selectTab = (tab) => {
	clearSelectedTabs()

	tab.setAttribute('aria-selected', true)
	tab.setAttribute('tab-index', 0)
}

addKeyListenerToTab()
for (let tab of tabs) {
	tab.addEventListener('click', handleTabClick)
}

/*
* Show/ hide nav dropdown
* Handle hamburger button click event  
*/

const dropDown = document.querySelector(".dropdown");
const header = document.querySelector(".header");
const navbartoggle = document.querySelector('.navbar-toggle');
const popup = document.querySelector(".popup")
const logo = document.querySelector(".header__logo")


navbartoggle.addEventListener("click", function () {
	dropDown.classList.toggle("change");
	navbartoggle.classList.toggle("navbar-show");
	navbartoggle.classList.toggle("navbar-toggle__cross");
	header.classList.toggle("color-change");
	logo.classList.toggle("logo-change--color")


	toggleScroll()


})
/*handling pop-up*/
window.addEventListener("load", function () {
	this.setTimeout(function open (event) {
		popup.classList.toggle("popup-add");

		toggleScroll()
	}, 1000)
});

/**
 * Enable/Disable scroll on body
 */
const toggleScroll = () => {
	document.body.classList.toggle('hide-scroll')

}

let close = document.querySelector(".popup-close");
close.addEventListener("click", function () {
	document.querySelector(".popup").remove(".popup-add")
	close.classList.toggle("popup-close")
	document.querySelector(".overlay").remove(".active")

	toggleScroll()
});

//enabling and disabling scroll//
//enabling and disabling scroll//
// const body = document.querySelector("body")
// // const mode = document.querySelector(".mode");
// const overlay = document.querySelector(".overlay")
// document.body.addEventListener('scroll', function (e) {
//     console.log(overlay);

//     overlay.classList.toggle("stop-scrolling");
//     if (!overlay.classList.contains("stop-scrolling")) {
//         document.body.style.overflow = "hidden"
//     } else {
//         document.body.style.overflow = "auto";
//     }
// });

function displayQuote (response) {

	// author.innerHTML = `<script>alert('hello');</script>`
	// quote.textContent = `<script>alert('hello');</script>`

	/**
	 * Setup particles js animation
	 */
	particlesJS.load('particles-js', 'particles.json', () => {
		let quote = document.querySelector(".quote-body__text")
		let author = document.querySelector(".quote-body__author")
		quote.textContent = response.data.data[0].quoteText
		author.textContent = response.data.data[0].quoteAuthor
	})

}

let apiUrl = " https://quote-garden.herokuapp.com/api/v3/quotes/random";
axios.get(apiUrl).then(displayQuote);

// email input validation
function validation (event) {
	var form = document.getElementById("form");
	event.preventDefault();
	var email = document.getElementById("email").value;
	var text = document.getElementById("text");
	var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
	var form_input = document.querySelector('.form-input')
	if (!email.match(pattern)) {
		text.innerHTML = "Whoops, make sure it's an email";
		form_input.classList.add('error');
	}
	form.reset();
}
