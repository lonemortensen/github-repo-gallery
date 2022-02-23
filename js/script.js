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
//The Back to Repo Gallery button:
const backToRepo = document.querySelector(".view-repos");
//The repo search field:
const filterInput = document.querySelector(".filter-repos");

//Fetch GitHub user information:
const getUserInfo = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);
    const userInfo = await response.json();
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
    displayRepos(repoData);
};

//Display information (name) about repos + display repo search field:
const displayRepos = function(repos) {
    filterInput.classList.remove("hide");
    for(const item of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${item.name}</h3>`; 
        repoList.append(repoItem);
    }
};

//Add eventlistener for entire repo list + pull data for individual repos (h3):
repoList.addEventListener("click", function(e) { 
    if (e.target.matches("h3")) { //captures click on individual repo titles; checks if target matches a specific element.
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//Fetch specific repo information + create list of languages:
const getRepoInfo = async function(repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let key in languageData) { //loops through languageData object keys.
        languages.push(key);
    }
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
    backToRepo.classList.remove("hide");
};

//Add eventlistener to Back to Repo Gallery button:
backToRepo.addEventListener("click", function() {
    repoContainer.classList.remove("hide");
    repoIndividual.classList.add("hide");
    backToRepo.classList.add("hide");
});

//Add eventlistener to the repo search field to create dynamic search for repos: 
filterInput.addEventListener("input", function(e) {
    const inputValue = e.target.value; 
    const repos = document.querySelectorAll(".repo"); //selects classList added to repoItem (li).
    const lowerCaseInputText = inputValue.toLowerCase();
    for (let repo of repos) {
        const lowerCaseRepoText = repo.innerText.toLowerCase();
        if (lowerCaseRepoText.includes(lowerCaseInputText)) {
            repo.classList.remove("hide");
        }
        else {
            repo.classList.add("hide");
        }
    }
});