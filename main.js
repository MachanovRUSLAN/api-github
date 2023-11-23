const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const userInfo = document.getElementById("userInfo");
const repoList = document.getElementById("repoList");
const followersList = document.getElementById("followersList");
const loader = document.getElementById("loader");

searchButton.addEventListener("click", searchUser);

async function searchUser() {
    const username = searchInput.value.trim();
    if (!username) {
        alert("İstifadəçi adını daxil edin");
        return;
    }

    showLoader();

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Display user information
        userInfo.innerHTML = `
            <h2>${userData.login}</h2>
            <img src="${userData.avatar_url}" alt="${userData.login}" width="100">
            <p>${userData.bio || "Ətraflı məlumat yoxdur."}</p>
            <p>Followers: ${userData.followers}</p>
            <p>Following: ${userData.following}</p>
            <button onclick="showRepos('${userData.repos_url}')">Repolar</button>
            <button onclick="showFollowers('${userData.followers_url}')">Followers</button>
        `;

        hideLoader();
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("İstifadəçi tapılmadı");
        hideLoader();
    }
}

async function showRepos(reposUrl) {
    showLoader();

    try {
        const reposResponse = await fetch(reposUrl);
        const reposData = await reposResponse.json();

        // Display user repos
        repoList.innerHTML = "<h3>Repolar:</h3>";
        if (reposData.length > 0) {
            reposData.forEach(repo => {
                repoList.innerHTML += `<p>${repo.name}</p>`;
            });
        } else {
            repoList.innerHTML += "<p>Repolar tapılmadı.</p>";
        }

        hideLoader();
    } catch (error) {
        console.error("Error fetching repos:", error);
        alert("Repolar tapılmadı");
        hideLoader();
    }
}

async function showFollowers(followersUrl) {
    showLoader();

    try {
        const followersResponse = await fetch(followersUrl);
        const followersData = await followersResponse.json();

        // Display user followers
        followersList.innerHTML = "<h3>Followers:</h3>";
        if (followersData.length > 0) {
            followersData.forEach(follower => {
                followersList.innerHTML += `<p>${follower.login}</p>`;
            });
        } else {
            followersList.innerHTML += "<p>Follower tapılmadı.</p>";
        }

        hideLoader();
    } catch (error) {
        console.error("Error fetching followers:", error);
        alert("Followers tapılmadı");
        hideLoader();
    }
}

function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}
