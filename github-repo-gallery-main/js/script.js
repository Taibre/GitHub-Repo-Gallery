//Where my profile information will appear
const overview = document.querySelector(".overview");
const username = "Taibre";
//select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
const repoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


const getProfileData = async function () {
    //const profile = await fetch("https://api.github.com/Taibre");
    const profileData = await fetch(`https://api.github.com/users/${username}`);
    const data = await profileData.json();
   displayProfileData(data);
};
getProfileData();
//console.log(getProfileData);

const displayProfileData = function (data) {
    const div = document.createElement("div");
div.classList.add("user-info");
div.innerHTML = `

<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
   overview.append(div); 
   repoFetch();
};

const repoFetch = async function () {
    const getRepo = await fetch(`https://api.github.com/users/taibre/repos?sort=updated&per_page=100`);
const data = await getRepo.json();
infoDisplay(data);
};

const infoDisplay = function (repos) {

    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);  
}};

repoList.addEventListener("click", function repoList (e) {
    if (e.target.matches("h3")){
        const repoName = e.target.textContent.trim();
    infoGrab(repoName);
    }
});

const infoGrab = async function (repoName) {
    const repoGrab = await fetch(`https://api.github.com/repos/taibre/${repoName}`);
    //console.log("Fetching repoGrab:", repoGrab);
    const repoInfo = await repoGrab.json() ;
   // console.log(repoInfo);
   const fetchLanguages = await fetch(`https://api.github.com/repos/taibre/${repoName}/languages`);
   const languageData = await fetchLanguages.json() ;
    //console.log(languageData);
   const languages = [] ;
   for (const language in languageData) {
    languages.push(language);
   // console.log(languages);
    
   }
   displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoDetails, languages) {
   repoData.innerHTML = "";
   repoData.classList.remove("hide");
   repoInfo.classList.add("hide");
    const div = document.createElement("div");
        div.innerHTML = `
    <div>
        <h2>Name: ${repoDetails.name}</h2>
    <p>Description: ${repoDetails.description}</p>
    <p>Default Branch: ${repoDetails.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoDetails.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    </div>`;

    repoData.append(div);
};

