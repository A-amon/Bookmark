
var staggerAnim
const downloadSection = document.querySelector('.download')

/**
 * Setting up stagger animation for download item
 */
const setStaggerAnimation = () => {
    staggerAnim = TweenMax.staggerFromTo('.download__item',
        1,
        { opacity: 0, y: -50 },
        { opacity: 1, y: (index) => index * 50 },
        0.2)

    staggerAnim.pause()
}

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

setStaggerAnimation()
setIntersectionObserver()