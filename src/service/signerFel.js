import { handleBreakpoints } from '@mui/system';
import React, {useEffect, useState} from 'react';
const axios = require('axios');



 const signerFile = (xmlFileEncode) =>{

   

    const jsonPostFile={
        llave:'da4d96099feaec40dce27b6143acc7be',
        archivo: xmlFileEncode,
        alias: "43213502",
        es_anulacion:'N'
    }

    const jsonPost = JSON.stringify(jsonPostFile);
    // const headers = {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    // }
    const options = {
        method: 'post',
        url: 'https://signer-emisores.feel.com.gt/sign_solicitud_firmas/firma_xml',
        data: jsonPost,
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        transformRequest: [(data, headers) => {
          // transform the data
      
          return data;
        }]
      };

      axios(options);
    // axios.post('https://signer-emisores.feel.com.gt/sign_solicitud_firmas/firma_xml',  jsonPost,{headers})
    // .then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log('Error', err);   
    // });

   
}
export default signerFile;

