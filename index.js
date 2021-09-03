


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
            if (currentWidth >= 1020)
                return index * 50
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
            gsap.set(elements, fromValues)
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
            setStaggerAnimation()
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

/**
 * Handle tab key pressed event
 * Allows navigation of tabs via arrow key
 * @param  {object} event
 * @param  {number} currentInd
 */
const handleTabKey = (event, currentInd) => {
    const key = event.keyCode
    const tabsArray = Array.from(tabs)
    const tabsLength = tabsArray.length

    let nextInd = currentInd

    switch (key) {
        // Left arrow
        case 37:
            nextInd--
            break
        // Right arrow
        case 39:
            nextInd++
            break
        default:
            break
    }

    if (nextInd > tabsLength - 1)
        nextInd = 0
    else if (nextInd < 0)
        nextInd = tabsLength - 1

    // Only focus on tab if nextInd changes
    nextInd !== currentInd && tabsArray[nextInd].focus()
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

    const panelInd = Array.from(panels).indexOf(panel)
    panel.addEventListener('keyup', event => handleTabKey(event, panelInd))
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

navbartoggle.addEventListener("click", function () {
    dropDown.classList.toggle("change");
    navbartoggle.classList.toggle("navbar-show");
    navbartoggle.classList.toggle("navbar-toggle__cross");
    header.classList.toggle("color-change",);

})


/*handling pop-up*/
window.addEventListener("load", function () {
    this.setTimeout(function open(event) {
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



function displayQuote(response) {

    let quote = document.querySelector(".quote-body__text")
    let author = document.querySelector(".quote-body__author")
    console.log(response);
    quote.textContent = response.data.data[0].quoteText
    author.textContent = response.data.data[0].quoteAuthor
    // author.innerHTML = `<script>alert('hello');</script>`
    // quote.textContent = `<script>alert('hello');</script>`

}

let apiUrl = " https://quote-garden.herokuapp.com/api/v3/quotes/random";
axios.get(apiUrl).then(displayQuote);

function validation(event) {
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
}


