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
const bars = document.querySelector(".bars")
const dropDown = document.querySelector(".sb1")
const close = document.querySelector(".close")
const color = document.querySelector(".color-change")
const navbar = document.querySelector(".navbar")
const logo = document.querySelector(".logo")

/*
* Show/ hide nav dropdown
*
*
*
* Handle hamburger button click event  
*/
bars.addEventListener("click", function () {
    dropDown.classList.toggle("change")
    bars.classList.remove("show")
    close.classList.add("show")

})

/*
* Handle close button click event
*/
close.addEventListener("click", function () {
    dropDown.classList.toggle("change")
    close.classList.remove("show")
    bars.classList.add("show")
    bars.classList.remove("color-change")
})

bars.addEventListener("click", function () {
    logo.classList.add("logo-change")
    navbar.classList.add("color-change")
})

close.addEventListener("click", function () {
    logo.classList.remove("logo-change")

    navbar.classList.remove("color-change")
})
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
}
