const url = "https://6777-82-69-42-98.eu.ngrok.io"

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