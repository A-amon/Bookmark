
var currentWidth
var staggerAnim

/**
 * Setting up stagger animation for download item
 * @param {boolean} play
 */
const setStaggerAnimation = (play = false) => {
    staggerAnim = TweenMax.staggerFromTo('.download__item',
        1,
        { opacity: 0, y: -50 },
        {
            opacity: 1, y: (index) => {
                if (currentWidth >= 1020)
                    return index * 50
                return 0
            }
        },
        0.2)

    if (!play)
        staggerAnim.pause()
    else
        staggerAnim.play()
}

const downloadSection = document.querySelector('.download')

/**
 * Setting up intersection observer for .download section
 */
const setIntersectionObserver = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            //  Play stagger animation when reaches .download
            if (entry.intersectionRatio > 0) {
                staggerAnim.play()
            }
            //  Reset stagger animation when not .downlaod
            else {
                staggerAnim.reverse()
            }
        })
    })

    observer.observe(downloadSection)
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
            setStaggerAnimation(true)
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
setIntersectionObserver()
setResizeListener()