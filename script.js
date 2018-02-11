function fetchJsonData(url, callBackFunction) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', function() {
        callBackFunction(JSON.parse(request.responseText));
    });

    request.open('get', url);
    request.send();
}

const url = 'https://api.github.com/orgs/HackYourFuture/repos';

function displayGithubRepositories(repositories){
    const ul = document.querySelector('#reposList');
    ul.innerHTML = "";
    for(let i=0; i < repositories.length; i++) {
        const repo = repositories[i];
        const li = document.createElement('li');
        li.innerHTML = '<a target="_blank" href="'+repo.html_url + '">'+repo.name+'</a>';
        
        li.addEventListener('click', function(event) {
            event.preventDefault();
            showContributors(repo.contributors_url);
        });
        
        ul.appendChild(li);
        console.log(repo);
    }
    // console.log(ul);
    // console.log(repositories);
}


function showContributors(url) {
    fetchJsonData(url, function(users){
        const contributorsList = document.querySelector('#contributorsList');
        contributorsList.innerHTML = "";

        for(let i=0; i < users.length; i++) {
            const user = users[i];
            const li = document.createElement('li');
            li.innerHTML = user.login;
            contributorsList.appendChild(li);
        }
        
    });
}

function searchGithubRepos(query) {
    const url = 'https://api.github.com/search/repositories?q=user:HackYourFuture+' + query;

    function onSearchComplete(data) {

        console.log(data);
        displayGithubRepositories(data.items);
    }
    fetchJsonData(url, onSearchComplete);
}

const btn1 = document.querySelector('#btn1');

btn1.addEventListener('click', function(){

    console.log('you clicked me!');

    const input = document.querySelector('#searchInput');
    console.log(input.value);
    searchGithubRepos(input.value);
});