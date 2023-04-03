function userInformationHTML(user) {
    return `
    <h3>${username}</h3>
    <span class="small-name> (@<a href="${user.html_url}" target="_blank">${user.login}</a>)</span>
    <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function fetchGitHubInformation(event) {

    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h3>Please enter a GitHub username</h3>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loading.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h3>No info found for user ${username}</h3>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h3>Error: ${errorResponse.responseJSON.message}</h3>`);
            }
        });
}