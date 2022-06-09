import {sha1,sha256,sha384,sha512} from 'crypto-hash';
import React, { useEffect, useState } from 'react';

const GenerateID = async () => {
    const [userID, setUserID] = useState('');
    const current = new Date().toLocaleString();
    const result = JSON.stringify(await sha256(current));
    console.log("User ID Unique Result is : ", result);
    console.log("useState ID : ", userID);
    return result;
};
export default GenerateID;