/* GITHUB REPO GALLERY */

//My profile information will appear here:
const profile = document.querySelector(".overview");
//My GitHub username:
const username = "lonemortensen";
//List of my public GitHub repos will appear here:
const repoList = document.querySelector(".repo-list");

//Fetch GitHub user information:
const getUserInfo = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);
    const userInfo = await response.json();
    //console.log(userInfo);
    displayUserInfo(userInfo);
};

getUserInfo();

//Display GitHub user information:
const displayUserInfo = function(userInfo) {
    const divElement = document.createElement("div"); 
    divElement.classList.add("user-info");
    divElement.innerHTML = `
        <figure>
            <img alt="user avatar" src=${userInfo.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${userInfo.name}</p>
            <p><strong>Bio:</strong> ${userInfo.bio}</p>
            <p><strong>Location:</strong> ${userInfo.location}</p>
            <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
        </div>
    `;
    profile.append(divElement);
    getRepos();
}; 

//Fetch public GitHub repos:
const getRepos = async function () {
    const response = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await response.json();
    //console.log(repoData);
    displayRepos(repoData);
};

//Display information about repos:
const displayRepos = function(repos) {
    for(const item of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${item.name}</h3>`; 
        repoList.append(repoItem);
    }
};

