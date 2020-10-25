// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

//random number starting with 0 and exclusive of max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('flex-inner')) {
        document.querySelector('flex-innter').remove();
      }
      
      const countryArr = range(10);
      const randomCountryArr = countryArr.map(() => {
        const randomNum = getRandomInt(243);
        return fromServer[randomNum];
      });
      
      const reverseList = randomCountryArr.sort((a, b) => sortFunction(b, a, 'name'));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol);

      reverseList.forEach((element, i) => {
        const li = document.createElement('ol');
        $(li).append(`<input type="checkbox" value=${element.code} id=${element.code} />`);
        $(li).append(`<label for=${element.code} > ${element.name} </label>`);
        $(ol).append(li);
      });

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});