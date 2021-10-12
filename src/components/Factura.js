import React, { Fragment, useState, useEffect } from 'react';
import DashboardContent from '../layout/layout';
import { Container, Grid, FilledInput, InputAdornment, IconButton, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@material-ui/core';
import { useStyles } from '../layout/layoutStyle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import dataFile from '../layout/xmlFile';
import signerFel from '../service/signerFel';

export const Factura = () => {

  const jsonData = {
    moneda: 'GTQ',
    fechaDocumento: '2021-10-08T00:00:00-06:00',
    tipoDocumento:'FACT',
    afiliacionIVA:'GEN',
    establecimiento:'1',
    correoEmisor:'info@demo.com',
    nitEmisor:'43213502',
    nombreComercial:'MATIZ CENTRO',
    nombreEmisor:'MATIZ CENTRO',
    direccionEmisor:'Guatemala, Guatemala',
    codigoPostalEmisor:'01001',
    municipioEmisor:'Guatemala',
    departamentoEmisor:'Guatemala',
    paisEmisor:'GT',
    correoReceptor:'demo@demo.com',
    /* DATOS EN ESTA PANTALLA */
    nitReceptor:'CF',
    nombreReceptor:'Consumidor Final',
    direccionReceptor:'CIUDAD',
    codigoPostalReceptor:'01001',
    municipioReceptor:'Guatemala',
    departamentoReceptor:'Guatemala',
    paisReceptor:'GT',
    /** DATOS ITEMS ARREGLO */
    bienOServicio:'B',
    numeroLinea:'1',
    cantidad:'3.00',
    unidadMedida:'UND',
    descripcion:'Producto de Pruebas',
    precioUnitario:'550.00',
    precio:'1650.00',
    descuento:"0.00",
    nombreImpuesto:'IVA',
    unidadGravable:"1",
    montoSinIVA:'1473.214286',
    montoIVA:'176.785714',
    totalLinea:'1650.00',
    /* TOTALES */
    totalImpuesto:'176.785714',
    totalDocumento:'1650.00'
}

  const valueDataFile=dataFile(jsonData);
  const jsonSigner = signerFel(valueDataFile);
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

  const [descripciones, setDescripciones]= useState([]);

  // useEffect(() => {}, [productos])
  useEffect(() => {
    loadProducts();
    }, []);

  const [datosCliente, setDatosCliente] = useState({
    nit: "",
    fechaDocumento:"",
    afiliacion: "",
    nombreComercial: "",
    nombreFiscal: "",
    direccion: "",
    departamento: "",
    municipio: "",
    pais: "",
    codigoPostal: "",
    correoElectronico: "",
    apiGeneral: "",
    apiCertificado: "",
    prefijo: "",
    correoCopia: ""
  })

  const handleInputChange = (event) => {
    setDatosCliente({
      ...datosCliente,
      [event.target.name]: event.target.value
    })
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
                        id="fechaDocumento"
                        name='fechaDocumento'
                        required
                        label="Fecha Factura"
                        value={valueCalendar}
                        onChange={(event) => {
                        setValueCalendar(event);
                        console.log(event);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
          </Grid>   
            <Grid item sm={4} >
              <TextField id="nitCliente" name='nitCliente' required fullWidth label="Ingrese NIT" variant="outlined" onChange={handleInputChange} />
            </Grid>
            <Grid item sm={8} >
              <TextField id="nombreCliente" name='nombreCliente' required fullWidth label="Ingrese Nombre" variant="outlined" onChange={handleInputChange} />
            </Grid>
            <Grid item sm={12} >
              <TextField id="direccionCliente" name='direccionCliente' required fullWidth label="Ingrese Direccion" variant="outlined" onChange={handleInputChange} />
            </Grid>
            <Grid item sm={4} >
              <TextField id="departamentoCliente" name='departamentoCliente' InputProps={{ readOnly: true, }} defaultValue="Departamento" fullWidth label="Departamento" variant="outlined" onChange={handleInputChange} />
            </Grid>
            <Grid item sm={4} >
              <TextField id="municipioCliente" name='municipioCliente' InputProps={{ readOnly: true, }} defaultValue="Municipio" fullWidth label="Municipio" variant="outlined" onChange={handleInputChange} />
            </Grid>
            <Grid item sm={4} >
              <TextField id="paisCliente" name='paisCliente' InputProps={{ readOnly: true, }} defaultValue="Pais" fullWidth label="Pais" variant="outlined" onChange={handleInputChange} />
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
                    <TextField required id="cantidad" name='cantidad' defaultValue='' placeholder={'1'} value={producto.cantidad} fullWidth label={`Linea ${index+1}`} variant="outlined" onChange={(event)=>{prodValuesInputChange(event, index)}} />
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
                                    onChange={(event)=>{prodValuesInputChange(event, index)}}
                                    >
                                    <MenuItem >
                                        <em>None</em>
                                    </MenuItem>
                                        {
                                            descripciones.map((descr)=>(
                                                <MenuItem value={descr.descripcion} name={'descripcion'}>
                                                    {descr.descripcion}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                  </Grid>
                  <Grid item sm={2} >
                    <TextField required id="precioUnitario" name='precioUnitario' defaultValue='' value={producto.precioUnitario} fullWidth label={`P. Unitario ${index+1}`} variant="outlined" onChange={(event)=>{prodValuesInputChange(event, index)}} />
                  </Grid>
                  <Grid item sm={2} >
                    <TextField   id="precio" name='precio' defaultValue='' value={producto.precio} InputProps={{ readOnly: true, }} fullWidth label={`Precio ${index+1}`} variant="outlined" onChange={(event)=>{prodValuesInputChange(event, index)}} />
                  </Grid>
                  <Grid item sm={2} >
                    <TextField  id="total" name='total' defaultValue='' value={producto.total} InputProps={{ readOnly: true, }} fullWidth label={`Total ${index+1}`} variant="outlined" onChange={(event)=>{prodValuesInputChange(event, index)}} />
                  </Grid>
                </Fragment>
              ))
            }
            <Box mt={14}>

            </Box>
            <Button
               
                fullWidth
                variant="contained"
                color="warning"
                onClick={(event)=>{console.log(jsonSigner)}}
            >
                Certificar
            </Button>
          </Grid>
        </Container>
      </main>
    </div>
  );
}