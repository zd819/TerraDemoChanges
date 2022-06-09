import {sha1,sha256,sha384,sha512} from 'crypto-hash';

async function generateID() {
    const current = new Date().toLocaleString();
    const result = JSON.stringify(sha256(current).then((res => res)));
    console.log("User ID Unique Result is : ", result);
    return result;
};
export default generateID;