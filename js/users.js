document.querySelector('.logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'index.html?logout=yes';
    // sessionStorage.removeItem('token');
});

//  GET USERS ---------------------------------------------------------------------
getUsers();

function getUsers() {
    var token = sessionStorage.getItem('token');
    fetch('https://hidden-plains-75908.herokuapp.com/users?token=' + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
}

function renderUsersList(users) {
    console.log(users);

    users.forEach(function(user) {
        var userListItem = `
        <div class="row">
            <div class="col-md-10">
            <li data-id="${user.id}" class="list-group-item">${user.username}</li>
            </div>
            <div class="col-md-2">
            <button id="follow-button" type="button" class="follow btn btn-info">Follow</button>
            </div>
        </div>`;

        document.querySelector('#all-users').innerHTML += userListItem;

        document.querySelector('#follow-button').addEventListener('click', function() {
            var followee = document.querySelector('.list-group-item').innerHTML;
            console.log(followee);
            var token = sessionStorage.getItem('token');
            fetch('https://hidden-plains-75908.herokuapp.com/socialize/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               
        body: JSON.stringify({
            // Takes json object we created and puts into string to send to back end
            // Back-end controls the left side, properties, of this object
            // Front-end controls the variables names and values on the right side
            username: followee,
            token: token,
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        })
        })
    });
} 

// // CREATE NEW POST -----------------------------------------------------------------

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch('http://6b6a8241.ngrok.io/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            message: message,
            token: token
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            var messageSent = document.querySelector('#messageSent');
            messageSent.classList.remove('hidden');
            messageSent.children[0].innerHTML = 'Message Sent: ' + response.body;

            setTimeout(function() {
                messageSent.classList.add('hidden');
            }, 3000);

        })
}

