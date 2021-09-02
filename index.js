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
            gsap.to(elements, toValues)
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


const bars = document.querySelector(".navbar-toggle__bars")
const dropDown = document.querySelector(".dropdown")
const cross = document.querySelector(".navbar-toggle__cross")
const color = document.querySelector(".color-change")
const navbar = document.querySelector(".navbar")
const logo = document.querySelector(".header__logo")
const header = document.querySelector(".header")
const navbartoggle = document.querySelector('.navbar-toggle')
/*
* Show/ hide nav dropdown
*
*
*
* Handle hamburger button click event  
*/
navbartoggle.addEventListener("click", function () {
    dropDown.classList.toggle("change")
    navbartoggle.classList.toggle("navbar-show")
    navbartoggle.classList.toggle("navbar-toggle__cross")
    header.classList.toggle("color-change")
    logo.classList.toggle("header__logo-change--color")

})

/*
* Handle close button click event
*/
// cross.addEventListener("click", function () {
//     dropDown.classList.toggle("change")
//     navbartoggle.classList.remove("navbar-show")
//     navbartoggle.classList.add("navbar-show")
//     bars.classList.remove("color-change")
//     header.classList.remove("color-change")
//     logo.classList.remove("header__logo-change--color")


// })


function validation (event) {
    var form = document.getElementById("form");
    event.preventDefault();
    var email = document.getElementById("email").value;
    var text = document.getElementById("text");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var form_input = document.querySelector('.form-input')
    if (email.match(pattern)) {
        text.innerHTML = "Whoops, make sure it's an email";
        form_input.classList.add('error');
    }
}
