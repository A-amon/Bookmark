
const bars = document.querySelector(".bars")
const dropDown = document.querySelector(".sb1")
const close = document.querySelector(".close")

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
    close.classList.remove("color-change")
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