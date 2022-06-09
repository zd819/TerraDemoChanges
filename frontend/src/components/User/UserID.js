import {sha1,sha256,sha384,sha512} from 'crypto-hash';
import React, { useEffect, useState } from 'react';

async function GenerateID() {
    const [userID, setUserID] = useState("");
    const current = new Date().toLocaleString();
    const test = "";
    const result = JSON.stringify(await sha256(current).then((res => setUserID(res))));
    console.log("User ID Unique Result is : ", result);
    console.log("Testing promise : ", test);
    console.log("useState ID : ", userID);
    return userID;
};
export default GenerateID;