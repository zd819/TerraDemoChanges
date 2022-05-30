async function getURL() {
    const url = "https://localhost:8080/newSession"
    return await fetch(url, {
      method: 'GET',
      headers: {userId: 'DunnoYet'}
    })
    .then(data => data.json())
   }
  
  //  async function generateID() {
  //    const current = new Date().toLocaleString();
  //    const result = JSON.stringify(await sha256(current));
  //    console.log(result);
  //    return result;
  //  }
  
  
export default function HandleClick(){
    console.log('WORKING1');
    getURL()
    .then((data) => {console.log(data); console.log('WORKING2');window.open(data.url)})
    .catch((error) => console.log(error));
  };