document.querySelector('.logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'index.html?logout=yes';
    // sessionStorage.removeItem('token');
});

document.querySelector('#signupButton').addEventListener('click', signup);

document.querySelector('#signinButton').addEventListener('click', signin)

// if (location.href.includes('logout')) {
//     document.querySelector('.loggedout').innerHTML = '<div class="alert alert-warning text-center">Logged out successfully.</div>';
// }

function signup() {
    var firstName = document.querySelector('#first_name').value;
    var lastName = document.querySelector('#last_name').value;
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var email = document.querySelector('#email').value;
    var photo = document.querySelector('#photo_url').value

    fetch('https://hidden-plains-75908.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            // Takes json object we created and puts into string to send to back end
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            email: email,
            photo_url: photo
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                location.href = 'users.html';
            }
            else {
                alert('There was an error with creating your account. Pleease try again.');
                console.log(response);
            }
        })
}

function signin() {
    var usernameLogin = document.querySelector('#username_login').value;
    var passwordLogin = document.querySelector('#password_login').value;

    fetch('https://hidden-plains-75908.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            // Takes json object we created and puts into string to send to back end
            username: usernameLogin,
            password: passwordLogin,
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                location.href = 'users.html';
            }
            else {
                alert('There was an error signing in. Please try again.');
                console.log(response);
            }
        })
}

