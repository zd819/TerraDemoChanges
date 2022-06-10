import {sha1,sha256,sha384,sha512} from 'crypto-hash';
import React, { useEffect, useState } from 'react';

async function GenerateID(){
    const [userID, setUserID] = useState('');
    const current = new Date().toLocaleString();
    let ID = await sha256(current).then((result) => {
        setUserID(result);
        return result;
      });

    return userID;
};
export default GenerateID;