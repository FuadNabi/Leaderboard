import './style.css';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const addButton = document.querySelector('.add-btn');
const refreshButton = document.querySelector('.refresh-btn');
const apiId = 'F1rXFC85VxYWBl3zqCH3';
const table = document.querySelector('.table');
const lorem = document.querySelector('.lorem');

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
    .then((json) => { lorem.innerHTML = json.result; });
};

const displayInfo = (info) => {
  console.log(info.result);
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

refreshButton.addEventListener('click', getInfo);

addButton.addEventListener('submit', (e) => {
  const user = document.querySelector('.user').value;
  const score = document.querySelector('.score').value;
  e.preventDefault();
  postInfo(user, score);
});