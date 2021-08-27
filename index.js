function validation(event) {
    var form = document.getElementById("form");
    event.preventDefault();
    var email = document.getElementById("email").value;
    var text = document.getElementById("text");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var form_input = document.querySelector('.form-input')
    if (! email.match(pattern)) {
        text.innerHTML = "Whoops, make sure it's an email";
        form_input.classList.add('error');
} 
}