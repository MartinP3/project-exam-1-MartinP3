// Form validating 

const form = document.querySelector("#contact-form");
const fullName = document.querySelector("#full-name");
const fullNameError = document.querySelector("#full-name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const formSuccess = document.querySelector("#form-success")

function validateForm() {
    event.preventDefault();

    if (checkLength(fullName.value, 5)) {
        fullNameError.style.display = "none";
    } else {
        fullNameError.style.display = "block";
    }
    if (validateEmail(email.value)) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }
    if (checkLength(subject.value, 15)) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }
    if (checkLength(message.value, 25)) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    } // length checking and email checking
    if ((checkLength(fullName.value, 5)) &&
        (checkLength(message.value, 25)) &&
        (checkLength(subject.value, 15)) &&
        (validateEmail(email.value))) {
        formSuccess.style.display = "block";
    } else {
        formSuccess.style.display = "none";
    }
}
form.addEventListener("submit", validateForm);

// trims away spaces to count only characters
function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const RegEx = /\S+@\S+\.\S+/;
    const emailPattern = RegEx.test(email);
    return emailPattern;
}