
const axios = require('axios');

const config = JSON.parse(localStorage.getItem('jsonConfiguracion')) || {};




 const signerFile = async (xmlFileEncode) =>{

  
    const jsonPostFile={
        llave: config.apiCertificado,
        archivo: xmlFileEncode,
        alias: config.prefijo,
        es_anulacion:'N'
    }


    const jsonPost = JSON.stringify(jsonPostFile);

        const headers = {
     
      'content-type': "application/json",
      'Access-Control-Allow-Origin':"*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }
    const response = await axios.post('https://signer-emisores.feel.com.gt/sign_solicitud_firmas/firma_xml',jsonPost,{headers});
    const result = response.data;
    return result  
}
export default signerFile;

