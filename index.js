
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