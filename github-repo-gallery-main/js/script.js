//Where my profile information will appear
const overview = document.querySelector(".overview");
const username = "Taibre";

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
};
