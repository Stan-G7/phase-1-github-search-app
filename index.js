// index.js
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== '') {
        searchUsers(searchTerm);
      }
    });
  
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== '') {
        suggestUsers(searchTerm);
      } else {
        clearSuggestions();
      }
    });
  
    function searchUsers(searchTerm) {
      const endpoint = `https://api.github.com/search/users?q=${searchTerm}`;
  
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          const users = data.items;
          displayUsers(users);
        })
        .catch(error => {
          console.error('Error retrieving users:', error);
        });
    }
  
    function suggestUsers(searchTerm) {
      const endpoint = `https://api.github.com/search/users?q=${searchTerm}`;
  
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          const users = data.items;
          displaySuggestions(users);
        })
        .catch(error => {
          console.error('Error retrieving suggestions:', error);
        });
    }
  
    function clearSuggestions() {
      userList.innerHTML = '';
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
  
      users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.classList.add('user');
        userElement.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userList.appendChild(userElement);
  
        userElement.addEventListener('click', () => {
          const username = user.login;
          displayUserRepositories(username);
        });
      });
    }
  
    function displaySuggestions(users) {
      userList.innerHTML = '';
  
      users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.classList.add('suggestion');
        userElement.textContent = user.login;
        userList.appendChild(userElement);
  
        userElement.addEventListener('click', () => {
          const searchTerm = user.login;
          searchInput.value = searchTerm;
          searchUsers(searchTerm);
        });
      });
    }
  
    function displayUserRepositories(username) {
      const endpoint = `https://api.github.com/users/${username}/repos`;
  
      fetch(endpoint)
        .then(response => response.json())
        .then(repos => {
          displayRepositories(repos);
        })
        .catch(error => {
          console.error('Error retrieving repositories:', error);
        });
    }
  
    function displayRepositories(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(repo => {
        const repoElement = document.createElement('li');
        repoElement.classList.add('repository');
        repoElement.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoElement);
      });
    }
  });
  