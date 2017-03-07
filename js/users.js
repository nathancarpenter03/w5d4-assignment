document.querySelector('.logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'index.html?logout=yes';
    // sessionStorage.removeItem('token');
});

document.querySelector('#all-users').addEventListener('click', function(e) {
    if (e.target.classList.contains('follow')) {
        var followButton = e.target;
        var followee = followButton.dataset.username;
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
            followButton.innerHTML = response.result === 'followed' ? 'Unfollow' : 'Follow';
        })
    }
})

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
            <div class="col-md-9">
                <li class="list-group-item">${user.username}</li>
            </div>
            <div class="col-md-2">
                <button data-username="${user.username}" type="button" class="follow btn btn-info">${user.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
        </div>`;

        document.querySelector('#all-users').innerHTML += userListItem;
    });
} 

