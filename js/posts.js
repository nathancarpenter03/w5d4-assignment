document.querySelector('.logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'index.html?logout=yes';
    // sessionStorage.removeItem('token');
});

getPosts();

function getPosts() {
    var token = sessionStorage.getItem('token');
    
    fetch('https://hidden-plains-75908.herokuapp.com/posts?token=' + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        renderPostsList(response);
    })
}

function renderPostsList(posts) {
    console.log(posts);

    posts = posts.reverse();
    

    posts.forEach(createPosts);
}

function createPosts(message) {
    var postListItem = `
    <li class="list-group-item">
        <div id="timeline-avatar"> <img src="${message.photo_url} alt="User avatar"></div>
        <span id="timeline-name">${message.username}</span>
        <span id="timeline-username" ${message.username}id="timeline-post">${message.message}</span>
        </li>`;

    var currentPostsHTML = document.querySelector('#posts').innerHTML;

    document.querySelector('#posts').innerHTML = postListItem + currentPostsHTML;
}

//  CREATE NEW POSTS

document.querySelector('#send-new-post').addEventListener('click', sendMessage);

function sendMessage() {
    var newPost = document.querySelector('#new-post').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#new-post').value = '';

    fetch('https://hidden-plains-75908.herokuapp.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            message: newPost,
            token: token,
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            var messageSent = document.querySelector('#messageSent');
            messageSent.classList.remove('hidden');
            messageSent.children[0].innerHTML = 'Message Sent: ' + response.message;

            setTimeout(function() {
                messageSent.classList.add('hidden');
            }, 2000);

        })

    function getPosts() {
    var token = sessionStorage.getItem('token');
    
    fetch('https://hidden-plains-75908.herokuapp.com/posts?token=' + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        renderPostsList(response);
    })
}
}
