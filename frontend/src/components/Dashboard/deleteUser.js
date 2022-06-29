const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/";

async function deleteReq(id) {
  return await fetch(url+'deleteUser', {
    method: 'GET',
    headers: {userId: id}
  })
  .then(data => data.json())
 }

  
  //  async function generateID() {
  //    const current = new Date().toLocaleString();
  //    const result = JSON.stringify(await sha256(current));
  //    console.log(result);
  //    return result;
  //  }
  
  
export default function deleteUser(id){
    deleteReq(id)
    .then((data) => {console.log('User ',id, ' deleted!');})
    .catch((error) => console.log(error));
  };