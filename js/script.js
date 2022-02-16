/* GITHUB REPO GALLERY */

//My profile information will appear here:
const profile = document.querySelector(".overview");
//My GitHub username:
const username = "lonemortensen";
//List of my public GitHub repos:
const repoList = document.querySelector(".repo-list");
//Public GitHub repo information will appear here: 
const repoContainer = document.querySelector(".repos");
//Data for the individual GitHub repo will appear here:
const repoIndividual = document.querySelector(".repo-data");

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

//Display information (name) about repos:
const displayRepos = function(repos) {
    for(const item of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${item.name}</h3>`; 
        repoList.append(repoItem);
    }
};

//Add eventlistener for entire repo list + pull data for individual repos (h3):
repoList.addEventListener("click", function(e) { 
    if (e.target.matches("h3")) { //captures click on individual repo titles, checks if target matches a specific element.
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//Fetch specific repo information + create list of languages:
const getRepoInfo = async function(repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (let key in languageData) { //loops through the languageData object keys.
        languages.push(key);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};  

//Display specific repo information:
const displayRepoInfo = function (repoInfo, languages) {
    repoIndividual.innerHTML = "";
    const divElement = document.createElement("div");
    divElement.innerHTML = `
        <h3>Name: ${repoInfo.name} </h3>
        <p>Description: ${repoInfo.description} </p>
        <p>Default branch: ${repoInfo.default_branch} </p>
        <p>Languages: ${languages.join(", ")} </p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoIndividual.append(divElement);
    repoIndividual.classList.remove("hide");
    repoContainer.classList.add("hide");
};

