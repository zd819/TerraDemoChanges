const url = "https://752b-80-3-12-252.eu.ngrok.io/";

async function getURL(id) {
  return await fetch(url+'newSession', {
    method: 'GET',
    headers: {"userId": id}
  })
  .then(data => data.json())
 }

export default function HandleClick(id){
    getURL(id)
    .then((data) => {console.log(data);window.open(data.url)})
    .catch((error) => console.log(error));
  };