'use strict';

const main = () => {
  const input = document.querySelector('input[name="username"]');
  let message;

  input.addEventListener('blur', () => {
    axios.get(`/api/username-unique?username=${input.value}`)
      .then((response) => {
        if (message) {
          message.remove();
        }
        message = document.createElement('p');
        if (response.data.unique) {
          message.innerText = 'username is unique yey!';
        } else {
          message.innerText = 'username is not unique, pick another one losaaaaahhhhh!!!';
        }
        input.parentNode.appendChild(message);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

window.addEventListener('load', main);
