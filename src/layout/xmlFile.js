const xmlDataFormated = function(jsonData) {

           const xmlResult= '<?xml version="1.0" encoding="UTF-8"?>\n'+
           '            <dte:GTDocumento xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:dte="http://www.sat.gob.gt/dte/fel/0.2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="0.1" xsi:schemaLocation="http://www.sat.gob.gt/dte/fel/0.2.0">\n'+
           '            <dte:SAT ClaseDocumento="dte">\n'+
           '                <dte:DTE ID="DatosCertificados">\n'+
           '                <dte:DatosEmision ID="DatosEmision">\n'+
           `                    <dte:DatosGenerales CodigoMoneda="${jsonData.moneda}" FechaHoraEmision="${jsonData.fechaDocumento}" Tipo="${jsonData.tipoDocumento}"></dte:DatosGenerales>\n`+
           `                    <dte:Emisor AfiliacionIVA="${jsonData.afiliacionIVA}" CodigoEstablecimiento="${jsonData.establecimiento}" CorreoEmisor="${jsonData.correoEmisor}" NITEmisor="${jsonData.nitEmisor}" NombreComercial="${jsonData.nombreComercial}" NombreEmisor="${jsonData.nombreEmisor}">\n`+
           '                    <dte:DireccionEmisor>\n'+
           `                        <dte:Direccion>${jsonData.direccionEmisor}</dte:Direccion>\n`+
           `                        <dte:CodigoPostal>${jsonData.codigoPostalEmisor}</dte:CodigoPostal>\n`+
           `                        <dte:Municipio>${jsonData.municipioEmisor}</dte:Municipio>\n`+
           `                        <dte:Departamento>${jsonData.departamentoEmisor}</dte:Departamento>\n`+
           `                        <dte:Pais>${jsonData.paisEmisor}</dte:Pais>\n`+
           '                    </dte:DireccionEmisor>\n'+
           '                    </dte:Emisor>\n'+
           `                    <dte:Receptor CorreoReceptor="${jsonData.correoReceptor}" IDReceptor="${jsonData.nitReceptor}" NombreReceptor="${jsonData.nombreReceptor}">\n`+
           '                    <dte:DireccionReceptor>\n'+
           `                        <dte:Direccion>${jsonData.direccionReceptor}</dte:Direccion>\n`+
           `                        <dte:CodigoPostal>${jsonData.codigoPostalReceptor}</dte:CodigoPostal>\n`+
           `                        <dte:Municipio>${jsonData.municipioReceptor}</dte:Municipio>\n`+
           `                        <dte:Departamento>${jsonData.departamentoReceptor}</dte:Departamento>\n`+
           `                        <dte:Pais>${jsonData.paisReceptor}</dte:Pais>\n`+
           '                    </dte:DireccionReceptor>\n'+
           '                    </dte:Receptor>\n'+
           '                    <dte:Frases>\n'+
           '                    <dte:Frase CodigoEscenario="1" TipoFrase="1"></dte:Frase>\n'+
           '                    </dte:Frases>\n'+
           '                    <dte:Items>\n'+
           `                    <dte:Item BienOServicio="${jsonData.bienOServicio}" NumeroLinea="${jsonData.numeroLinea}">\n`+
           `                        <dte:Cantidad>${jsonData.cantidad}</dte:Cantidad>\n`+
           `                        <dte:UnidadMedida>${jsonData.unidadMedida}</dte:UnidadMedida>\n`+
           `                        <dte:Descripcion>${jsonData.descripcion}</dte:Descripcion>\n`+
           `                        <dte:PrecioUnitario>${jsonData.precioUnitario}</dte:PrecioUnitario>\n`+
           `                        <dte:Precio>${jsonData.precio}</dte:Precio>\n`+
           `                        <dte:Descuento>${jsonData.descuento}</dte:Descuento>\n`+
           '                        <dte:Impuestos>\n'+
           '                        <dte:Impuesto>\n'+
           `                            <dte:NombreCorto>${jsonData.nombreImpuesto}</dte:NombreCorto>\n`+
           `                            <dte:CodigoUnidadGravable>${jsonData.unidadGravable}</dte:CodigoUnidadGravable>\n`+
           `                            <dte:MontoGravable>${jsonData.montoSinIVA}</dte:MontoGravable>\n`+
           `                            <dte:MontoImpuesto>${jsonData.montoIVA}</dte:MontoImpuesto>\n`+
           '                        </dte:Impuesto>\n'+
           '                        </dte:Impuestos>\n'+
           `                        <dte:Total>${jsonData.totalLinea}</dte:Total>\n`+
           '                    </dte:Item>\n'+
           '                    </dte:Items>\n'+
           '                    <dte:Totales>\n'+
           '                    <dte:TotalImpuestos>\n'+
           `                        <dte:TotalImpuesto NombreCorto="${jsonData.nombreImpuesto}" TotalMontoImpuesto="${jsonData.totalImpuesto}"></dte:TotalImpuesto>\n`+
           '                    </dte:TotalImpuestos>\n'+
           `                    <dte:GranTotal>${jsonData.totalDocumento}</dte:GranTotal>\n`+
           '                    </dte:Totales>\n'+
           '                </dte:DatosEmision>\n'+
           '                </dte:DTE>\n'+
           '            </dte:SAT>\n'+
           '            </dte:GTDocumento>';

           let encodedString = Buffer.from(xmlResult).toString('base64');
           return encodedString;
}

export default xmlDataFormated;