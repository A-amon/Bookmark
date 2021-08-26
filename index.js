function validation() {
    var form = document.getElementById("form");
    var email = document.getElementById("email").value;
    var text = document.getElementById("text");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (! email.match(pattern)) {
        text.innerHTML = "Whoops, make sure it's an email";
        form.style.background= "url(/assets/icons/icon-error.svg)";
        form.style.backgroundRepeat = "no-repeat";
        
        text.style.backgroundColor="hsl(0, 94%, 66%)";

    } 
}