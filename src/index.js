import './style.css';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const addButton = document.querySelector('.add-btn');
const refreshButton = document.querySelector('.refresh-btn');
const apiId = 'n05hmXlj4HMt8U3VZc84';
const table = document.querySelector('.table');
const resultCont = document.querySelector('.result-cont');

const displayInfo = (info) => {
  table.innerHTML = '';
  info.result.forEach((e) => {
    table.innerHTML += `<tr><td>${e.user}: ${e.score}</td></tr>`;
  });
};

const getInfo = async () => {
  await fetch(`${apiUrl}/:${apiId}/scores/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

    .then((info) => info.json())
    .then((json) => displayInfo(json));
};

const postInfo = async (user, score) => {
  await fetch(`${apiUrl}/:${apiId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      resultCont.innerHTML = '';
      const result = document.createElement('p');
      result.classList.add('add-result');
      result.innerHTML = json.result;
      resultCont.appendChild(result);
      getInfo();
    });
};

document.addEventListener('DOMContentLoaded', getInfo);

refreshButton.addEventListener('click', getInfo);

addButton.addEventListener('click', (e) => {
  const user = document.querySelector('.user');
  const score = document.querySelector('.score');
  e.preventDefault();
  postInfo(user.value, score.value);
  user.value = '';
  score.value = '';
});