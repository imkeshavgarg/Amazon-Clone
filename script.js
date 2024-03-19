
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Simple email validation
    if (!email || email.trim() === "") {
        alert("Please enter your email.");
        return;
    }

    // Simple password validation
    if (!password || password.trim() === "") {
        alert("Please enter your password.");
        return;
    }

});

// JavaScript for signup page
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!username || username.trim() === "") {
        alert("Please enter your username.");
        return;
    }

    if (!email || email.trim() === "") {
        alert("Please enter your email.");
        return;
    }

    if (!password || password.trim() === "") {
        alert("Please enter your password.");
        return;
    }

});
