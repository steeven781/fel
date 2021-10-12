import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import { useStyles } from '../layout/layoutStyle';
import fs from 'fs';

import { Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@material-ui/core';
const axios = require('axios');


const initialConfig = JSON.parse(localStorage.getItem('jsonConfiguracion')) || {};

export const Configuracion = () => {
    const classes = useStyles();

    const [datos, setDatos] = useState({
        nit: '',
        afiliacion: '',
        nombreComercial: '',
        nombreFiscal: '',
        direccion: '',
        departamento: '',
        municipio: '',
        pais: '',
        codigoPostal: '',
        correoElectronico: '',
        apiGeneral: '',
        apiCertificado: '',
        prefijo: '',
        correoCopia: ''
    })

    const [paises, setPaises] = useState([]);


    useEffect(() => {
        loadCountries();
       // console.log('pais', paises);
        setDatos(initialConfig);
       // console.log('datos', datos)
    }, []);

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });

        console.log('datos', datos);
    }

    const sentData = (event) => {
        event.preventDefault();
       // console.log(JSON.stringify(datos));
        localStorage.setItem('jsonConfiguracion', JSON.stringify(datos));
        
    }

    const loadCountries = async () => {
        const result = await axios.get('https://restcountries.com/v2/all');
        setPaises(result.data);
    }


    return (
        <div className={classes.root}>
            <Layout />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container component="main" maxWidth='md'>

                    <h1>Configuracion</h1>

                    <Typography>
                        Ingreso de Informacion del Emisor de la Factura
                    </Typography>
                    <Box mt={5}>

                    </Box>
                    <form autoComplete='off' onSubmit={sentData}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} >
                                <TextField id="nit" name='nit' required fullWidth label="NIT" value={datos.nit} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6} >
                                <TextField id="afiliacion" name='afiliacion' fullWidth required value={datos.afiliacion} label="Afiliacion IVA" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="nombreComercial" name='nombreComercial' required fullWidth value={datos.nombreComercial} label="Nombre Comercial" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="nombreFiscal" name='nombreFiscal' required fullWidth value={datos.nombreFiscal} label="Nombre Fiscal" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="direccion" name='direccion' required fullWidth value={datos.direccion} label="Direccion" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="departameto" name='departamento' required fullWidth value={datos.departamento} label="Departamento" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="municipio" name='municipio' required fullWidth label="Municipio" value={datos.municipio} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl variant="filled" fullWidth className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Pais</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="selectPais"
                                     value={datos.pais}
                                    name={'pais'}
                                    onChange={handleInputChange}

                                    >
                                    <MenuItem >
                                       None
                                    </MenuItem>
                                        {
                                            paises.map((pais)=>(
                                                <MenuItem value={pais.alpha2Code} name={'pais'}>
                                                    {pais.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="codigoPostal" name='codigoPostal' value={datos.codigoPostal} required fullWidth label="Codigo postal" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="correoElectronico" name='correoElectronico' value={datos.correoElectronico} required fullWidth label="Correo Electronico" variant="outlined" onChange={handleInputChange} />
                            </Grid>

                        </Grid>

                        <h1>Configuracion API Keys</h1>
                        <Typography>
                            Ingreso de Informacion de API Keys del Certificador
                        </Typography>
                        <Box mt={5}>

                        </Box>
                        <Grid container spacing={2}>
                            <Grid item sm={6} >
                                <TextField id="apiGeneral" name='apiGeneral' value={datos.apiGeneral} required fullWidth label="API Key General" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6} >
                                <TextField id="apiCertificado" name='apiCertificado' value={datos.apiCertificado} fullWidth required label="API Key Certificado" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="prefijo" name='prefijo' value={datos.prefijo} required fullWidth label="Prefijo FEL" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="correoCopia" name='correoCopia' value={datos.correoCopia} required fullWidth label="Correo PDF" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Box mt={14}>

                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Guardar
                            </Button>

                        </Grid>


                    </form>




                </Container>
                <Box mt={10}>

                </Box>


            </main>

        </div>
    );
}