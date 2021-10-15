
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

const config = JSON.parse(localStorage.getItem('jsonConfiguracion')) || {};

const certificateFile = async (xmlFileEncodeSigned) => {


    const jsonPostFile = {
        nit_emisor: config.nit,
        correo_copia: config.correoCopia,
        xml_dte: xmlFileEncodeSigned
    }


    const jsonPost = JSON.stringify(jsonPostFile);

    const headers = {

        'content-type': "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "LLAVE": config.apiGeneral,
        "USUARIO": config.prefijo,
        "Identificador":uuidv4()

    }
    const response = await axios.post('https://certificador.feel.com.gt/fel/certificacion/v2/dte', jsonPost, { headers });
    const result = response.data;
    return result

}
export default certificateFile;

