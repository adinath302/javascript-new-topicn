const apiurl = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchbox = document.querySelector("#search");


const getuser = async (username) => {
    const response = await fetch(apiurl + username)
    const data = await response.json();

    const card = `
    <div class="card">
            <div class="profile">
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop" srcset="">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong> followers</strong></li>
                    <li>${data.following}<strong> Following</strong></li>
                    <li>${data.public_repos}<strong> repos</strong></li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>
        `
    main.innerHTML = card;
    getrepos(username)
}

//init call
getuser("taylorotwell")

const getrepos = async (username) => {
    const repos = document.querySelector("#repos")
    const response = await fetch(apiurl + username + "/repos")
    const data = await response.json();
    data.forEach(
        (item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo")
            elem.href = item.html_url
            elem.innerText = item.name
            elem.target = "_blank"
            repos.appendChild(elem);
        });
}

const fromsubmit = () => {
    if (searchbox.value != "") {
        getuser(searchbox.value);
    }
    return false;
}
/*
<a href="#" class="repo" target="_blank">Repo 1</a>
<a href="#" class="repo" target="_blank">Repo 2</a>
<a href="#" class="repo" target="fFblank">Repo 3</a>
*/

searchbox.addEventListener(
    "focusout",
    function() {
        fromsubmit();
    }

)