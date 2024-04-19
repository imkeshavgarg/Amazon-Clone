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
function logout() {
    // Define the logout URL
    const logoutUrl = '/logout';
    
    // Make an AJAX request to the logout URL
    fetch(logoutUrl, {
      method: 'POST', // Change method to GET if necessary
      headers: {
        'Content-Type': 'application/json',
        // Include any other necessary headers, such as an Authorization token if required
      },
      // Include any necessary body data, such as a CSRF token, if required
    })
    .then(response => {
      if (response.ok) {
        // Logout was successful
        // Redirect user to the home page or login page
        window.location.href = './login';
      } else {
        // Handle error (e.g. log it or show an error message to the user)
        console.error('Logout failed:', response.statusText);
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('An error occurred:', error);
    });
  }
  
  // Attach the logout function to a button (for example)
  document.getElementById('logoutButton').addEventListener('click', logout);
  