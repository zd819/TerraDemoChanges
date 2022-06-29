const url = "http://localhost:8080/";

async function deleteReq(id) {
  return await fetch(url+'user/delete', {
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