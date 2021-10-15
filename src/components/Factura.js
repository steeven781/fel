import React, { Fragment, useState, useEffect } from 'react';
import DashboardContent from '../layout/layout';
import { Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@material-ui/core';
import { useStyles } from '../layout/layoutStyle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import dataFile from '../layout/xmlFile';
import signerFel from '../service/signerFel';
import certificateFel from '../service/certificateFel';
import { toast, Slide } from 'react-toastify';


const config = JSON.parse(localStorage.getItem('jsonConfiguracion')) || {};
export const Factura = () => {

  const jsonData = {
    moneda: 'GTQ',
    fechaDocumento: '',
    tipoDocumento: 'FACT',
    afiliacionIVA: config.afiliacion,
    establecimiento: '1',
    correoEmisor: config.correoElectronico,
    nitEmisor: config.nit,
    nombreComercial: config.nombreComercial,
    nombreEmisor: config.nombreFiscal,
    direccionEmisor: config.direccion,
    codigoPostalEmisor: config.codigoPostal,
    municipioEmisor: config.municipio,
    departamentoEmisor: config.departamento,
    paisEmisor: config.pais,
    /* DATOS EN ESTA PANTALLA */
    correoReceptor: '',
    nitReceptor: '',
    nombreReceptor: '',
    direccionReceptor: '',
    codigoPostalReceptor: '',
    municipioReceptor: '',
    departamentoReceptor: '',
    paisReceptor: '',
    /** DATOS ITEMS ARREGLO */
    items: [],
    /* TOTALES */
    totalImpuesto: '',
    totalDocumento: ''
  }

  //const valueDataFile=dataFile(jsonData);
  //const jsonSigner = signerFel(valueDataFile);
  const descripcionProductos = require('../JSON/products.json');
  const classes = useStyles();
  const [valueCalendar, setValueCalendar] = useState(null);

  const [productos, setProductos] = useState([
    {
      cantidad: '',
      descripcion: '',
      precioUnitario: '',
      precio: '',
      total: '',
    }
  ]);

  const [descripciones, setDescripciones] = useState([]);

  // useEffect(() => {}, [productos])
  useEffect(() => {
    loadProducts();
    console.log(config);
  }, []);

  const [datosCliente, setDatosCliente] = useState({
    nitCliente: "",
    nombreCliente: "",
    direccionCliente: "",
    departamentoCliente: "",
    municipioCliente: "",
    paisCliente: "",
    codigoPostal: "",
    correoCliente: "",
    fechaFactura: '',
    totalImpuesto: '',
    totalGeneral: ''
  })

  const handleInputChange = (event) => {
    setDatosCliente({
      ...datosCliente,
      [event.target.name]: event.target.value
    })


  }

  const handleCalendarChange = (event) => {
    let date = new Date(event);
    setDatosCliente({
      ...datosCliente,
      fechaFactura: date.toISOString().substring(0, 19) + "-06:00"
    })
    setValueCalendar(event);
  }

  const prodValuesInputChange = (event, index) => {
    const producto = descripcionProductos.find((producto) => producto.descripcion === event.target.value);

    let modifyProducts = [...productos];

    for (const [indexProducto] of modifyProducts.entries()) {
      if (indexProducto === index) {
        modifyProducts[index][event.target.name] = event.target.value;

        if (!!producto) {
          const { precio } = producto;
          if (event.target.name === 'descripcion') {
            modifyProducts[index]['precioUnitario'] = precio;
          }
        }

        if (modifyProducts[index]['cantidad'] && modifyProducts[index]['precioUnitario']) {
          modifyProducts[index]['precio'] = (+modifyProducts[index]['cantidad']) * (+modifyProducts[index]['precioUnitario']);
          modifyProducts[index]['total'] = (+modifyProducts[index]['cantidad']) * (+modifyProducts[index]['precioUnitario']);
        }
      }
    }
    setProductos(modifyProducts);
  }


  const loadProducts = () => {
    setDescripciones(descripcionProductos);
  }


  const addProduct = () => {
    let cloneProducts = [...productos];
    cloneProducts.push({
      cantidad: '',
      descripcion: '',
      precioUnitario: '',
      precio: '',
      total: '',
    });
    setProductos(cloneProducts);
  }

  const removeProduct = (index) => {
    let cloneProducts = [...productos];
    if (productos.length > 1) {
      cloneProducts.splice((productos.length - 1), 1);
      setProductos(cloneProducts);
    }
  }

  const loadDatatoSign = async () => {
    let totaldoc = 0;
    //SET DATOS RECEPTOR
    jsonData.nitReceptor = datosCliente.nitCliente;
    jsonData.nombreReceptor = datosCliente.nombreCliente;
    jsonData.direccionReceptor = datosCliente.direccionCliente;
    jsonData.municipioReceptor = datosCliente.municipioCliente;
    jsonData.departamentoReceptor = datosCliente.departamentoCliente;
    jsonData.paisReceptor = datosCliente.paisCliente;
    jsonData.correoReceptor = datosCliente.correoCliente;
    jsonData.codigoPostalReceptor = '01001';
    jsonData.fechaDocumento = datosCliente.fechaFactura;
    //SET DATOS PRODUCTOS
    for (const [indexProd] of productos.entries()) {
      jsonData.items.push({
        bienOServicio: 'B',
        numeroLinea: indexProd + 1,
        cantidad: productos[indexProd].cantidad,
        unidadMedida: 'UND',
        descripcion: productos[indexProd].descripcion,
        precioUnitario: productos[indexProd].precioUnitario,
        precio: productos[indexProd].precio,
        descuento: "0.00",
        nombreImpuesto: 'IVA',
        unidadGravable: "1",
        montoSinIVA: Math.round((productos[indexProd].precio / 1.12) * 100) / 100,
        montoIVA: Math.round(((productos[indexProd].precio / 1.12) * 0.12) * 100) / 100,
        totalLinea: productos[indexProd].total
      });
      jsonData.totalImpuesto = Math.round((jsonData.totalImpuesto + ((productos[indexProd].precio / 1.12) * 0.12)) * 100) / 100;
      totaldoc = totaldoc + productos[indexProd].precio
      jsonData.totalDocumento = totaldoc;
      //console.log('productos[indexProd].precio)',productos[indexProd].precio);
      // console.log('tota;',totaldoc);
    }
    // console.log('IMPUESTO',jsonData.totalImpuesto);
    // console.log('TOTAL',jsonData.totalDocumento);
    // console.log('JSON DATOS',jsonData);
    const base64Result = dataFile(jsonData);
    const resultSign = await signerFel(base64Result);
    const resultCertificate = await certificateFel(resultSign.archivo);
    // console.log(resultCertificate);
    if (resultSign.resultado) {
      if (resultCertificate.resultado) {

        const jsonFactura = {
          UUID: resultCertificate.uuid,
          serie: resultCertificate.serie,
          numero: resultCertificate.numero,
          fecha: resultCertificate.fecha,
          cliente: datosCliente.nombreCliente,
          monto: jsonData.totalDocumento
        }
        SetLocalStorageFactura(jsonFactura)
        //console.log('resultCertificate', resultCertificate);
        //console.log('resultSign', resultSign);

        ClearData()
        jsonData.totalImpuesto = 0;
        jsonData.totalDocumento = 0;
        totaldoc = 0;
      } else {
        console.log(resultCertificate.descripcion_errores[0].mensaje_error);

        toast.error(`Documento No Certificado, Revise la Consola`, {
          transition: Slide,
          closeButton: true,
          autoClose: 5000,
          position: 'top-right',
          type: 'error',
          theme: "colored"
        });
      }
    } else {
      console.log(resultCertificate.descripcion);
      toast.error(`Documento No Firmado, Revise la Consola`, {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'top-right',
        type: 'error',
        theme: "colored"
      });
    }
  }

const SetLocalStorageFactura = (dataFactura) => {
  let lastIndex = 1;
  const facturas = JSON.parse(localStorage.getItem('facturasCertificadas')) || [];
  const cloneFacturas = [...facturas];

  if (cloneFacturas.length) {
    lastIndex = (cloneFacturas[cloneFacturas.length - 1]['id']) + 1;
  }

  Object.assign(dataFactura, { 'id': lastIndex });
  cloneFacturas.push(dataFactura);
  localStorage.setItem('facturasCertificadas', JSON.stringify(cloneFacturas));

  toast.success(`Documento Certificado Con Exito!`, {
    transition: Slide,
    closeButton: true,
    autoClose: 5000,
    position: 'top-right',
    type: 'success',
    theme: "colored"
  });

}

const ClearData = () => {

  setDatosCliente({
    nitCliente: '',
    nombreCliente: '',
    direccionCliente: '',
    departamentoCliente: '',
    municipioCliente: '',
    paisCliente: '',
    codigoPostal: '',
    correoCliente: '',
    fechaFactura: '',
    totalImpuesto: '',
    totalGeneral: ''
  });

  setProductos([{
    cantidad: '',
    descripcion: '',
    precioUnitario: '',
    precio: '',
    total: '',
  }])

  setValueCalendar();

}


return (

  <div className={classes.root}>
    <DashboardContent />
    <main className={classes.content} >
      <div className={classes.appBarSpacer} />
      <h1>Crear Nueva Factura</h1>
      <Container component="main" maxWidth='md'>
        <Box mt={4}></Box>
        <Typography>
          Ingrese la informacion del cliente
        </Typography>
        <Box mt={4}></Box>
        <Grid container spacing={2}>
          <Grid item sm={8} />
          <Grid item sm={4} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id="fechaFactura"
                name={'fechaFactura'}
                required
                label="Fecha Factura"
                value={valueCalendar}
                onChange={(event) => {
                  console.log(event)
                  handleCalendarChange(event)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={4} >
            <TextField id="nitCliente" name='nitCliente' required fullWidth value={datosCliente.nitCliente} label="Ingrese NIT" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={8} >
            <TextField id="nombreCliente" name='nombreCliente' required value={datosCliente.nombreCliente} fullWidth label="Ingrese Nombre" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={8} >
            <TextField id="direccionCliente" name='direccionCliente' value={datosCliente.direccionCliente} required fullWidth label="Ingrese Direccion" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={4} >
            <TextField id="correoCliente" name='correoCliente' value={datosCliente.correoCliente} required fullWidth label="Ingrese Correo" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={4} >
            <TextField id="departamentoCliente" name='departamentoCliente' value={datosCliente.departamentoCliente} fullWidth label="Departamento" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={4} >
            <TextField id="municipioCliente" name='municipioCliente' value={datosCliente.municipioCliente} fullWidth label="Municipio" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={4} >
            <TextField id="paisCliente" name='paisCliente' value={datosCliente.paisCliente} fullWidth label="Pais" variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item sm={8} />
          <Grid item sm={2} >
            <Button
              variant="outlined"
              color="success"
              onClick={() => addProduct()}
            >
              Agregar (+)
            </Button>
          </Grid>
          <Grid item sm={2} >
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeProduct()}
            >
              Eliminar (-)
            </Button>
          </Grid>
          {
            productos.map((producto, index) => (
              <Fragment>
                <Grid item sm={2} >
                  <TextField required id="cantidad" name='cantidad' defaultValue='' placeholder={'1'} value={producto.cantidad} fullWidth label={`Linea ${index + 1}`} variant="outlined" onChange={(event) => { prodValuesInputChange(event, index) }} />
                </Grid>
                {/* <Grid item sm={4} >
                    <TextField required id="descripcion" name='descripcion' defaultValue={`Producto ${index+1}`} fullWidth label={`Descripcion ${index+1}`} variant="outlined" onChange="" />
                  </Grid> */}
                <Grid item sm={4}>
                  <FormControl variant="filled" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Descripcion</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="selectDescripcion"
                      value={producto.descripcion}
                      name={'descripcion'}
                      onChange={(event) => { prodValuesInputChange(event, index) }}
                    >
                      <MenuItem >
                        <em>None</em>
                      </MenuItem>
                      {
                        descripciones.map((descr) => (
                          <MenuItem value={descr.descripcion} name={'descripcion'}>
                            {descr.descripcion}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={2} >
                  <TextField required id="precioUnitario" name='precioUnitario' defaultValue='' value={producto.precioUnitario} fullWidth label={`P. Unitario ${index + 1}`} variant="outlined" onChange={(event) => { prodValuesInputChange(event, index) }} />
                </Grid>
                <Grid item sm={2} >
                  <TextField id="precio" name='precio' defaultValue='' value={producto.precio} InputProps={{ readOnly: true, }} fullWidth label={`Precio ${index + 1}`} variant="outlined" onChange={(event) => { prodValuesInputChange(event, index) }} />
                </Grid>
                <Grid item sm={2} >
                  <TextField id="total" name='total' defaultValue='' value={producto.total} InputProps={{ readOnly: true, }} fullWidth label={`Total ${index + 1}`} variant="outlined" onChange={(event) => { prodValuesInputChange(event, index) }} />
                </Grid>
              </Fragment>
            ))
          }
          {/* <Grid item sm={6} />
            <Grid item sm={2} />
            <Grid item sm={2} >
              <TextField id="totalIVA" name='totalIVA' InputProps={{ readOnly: true, }} value={datosCliente.totalImpuesto}   fullWidth label="Total IVA" variant="outlined"  />
            </Grid>
            <Grid item sm={2} >
              <TextField id="totalGeneral" name='totalGeneral'  InputProps={{ readOnly: true, }} value={datosCliente.totalGeneral}  fullWidth label="Gran Total" variant="outlined"  />
            </Grid> */}

          <Box mt={14}>

          </Box>
          <Button

            fullWidth
            variant="contained"
            color="warning"
            onClick={loadDatatoSign /*(event)=>{console.log(valueDataFile)}*/}
          >
            Certificar
          </Button>
        </Grid>
      </Container>
    </main>
  </div>
);
}