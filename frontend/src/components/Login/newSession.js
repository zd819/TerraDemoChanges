const url = "https://7a34-2a02-6b6a-8c49-0-45a2-f907-3fe0-4be7.eu.ngrok.io";

async function getURL(data) {
  return await fetch(url+'/newSession', {
    method: 'GET',
    headers: {userId: data}
  })
  .then(data => data.json())
 }

  
  //  async function generateID() {
  //    const current = new Date().toLocaleString();
  //    const result = JSON.stringify(await sha256(current));
  //    console.log(result);
  //    return result;
  //  }
  
  
export default function HandleClick(data){
    getURL(data)
    .then((data) => {console.log(data);window.open(data.url)})
    .catch((error) => console.log(error));
  };