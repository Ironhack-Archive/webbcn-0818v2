'use strict';

const main = () => {
  const nodes = document.querySelectorAll('section h2');

  for (let ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', (event) => {
      const h2 = event.currentTarget;
      const section = h2.parentNode;
      section.classList.toggle('expanded');
    });
  };
};

window.addEventListener('load', main);
