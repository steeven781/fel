import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import {useStyles} from '../layout/layoutStyle';
import { makeStyles } from '@mui/styles';
import { Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@material-ui/core';
const axios = require('axios');

const configStyle = ((makeStyles) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: '5'
      },
      formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        //marginTop: theme.spacing(2),
      },
      secondGrid:{
         marginTop: '8'
      }
}));


export  const Configuracion = () =>{
    const classes = useStyles();

        const [datos, setDatos] = useState({
            nit:'',
            afiliacion:"", 
            nombreComercial:"",
            nombreFiscal:"",
            direccion:"",
            departamento:"",
            municipio:"", 
            pais:"", 
            codigoPostal:"", 
            correoElectronico:"",
            apiGeneral:"", 
            apiCertificado:"",
            prefijo:"",
            correoCopia:""
        })

        const handleInputChange = (event)=>{
            setDatos({
                ...datos,
                [event.target.name]:event.target.value
            })
        }

        const sentData =(event)=>{
            event.preventDefault();
            console.log(JSON.stringify(datos));
        }

    const handleChange =(e)=>{
        console.log(e.target);
    };
    const [pais, setPais]= useState([]);
    useEffect(()=>{
        loadCountries();
    }, []);

    const loadCountries = async () =>{
        const result = await axios.get('https://restcountries.eu/rest/v2/all');
        setPais(result.data);
    }


    return (  
        <div className={classes.root}>
            <Layout/>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container component="main" maxWidth='md'>
                  
              <h1>Configuracion</h1>   
              
                    <Typography>
                        Ingreso de Informacion del Emisor de la Factura
                    </Typography>
                    <Box mt={5}>
                             
                    </Box>
                    <form className={configStyle.form} autoComplete='off' onSubmit={sentData}>
                        <Grid container spacing={2}>
                            <Grid item  sm={6} >
                                 <TextField id="nit" name='nit' required fullWidth  label="NIT" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6} >
                                <TextField id="afiliacion" name='afiliacion' fullWidth required label="Afiliacion IVA" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="nombreComercial" name='nombreComercial' required fullWidth label="Nombre Comercial" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="nombreFiscal" name='nombreFiscal' required fullWidth label="Nombre Fiscal" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="direccion" name='direccion' required fullWidth label="Direccion" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item  sm={6}>
                                <TextField id="departameto" name='departamento' required fullWidth label="Departamento" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="municipio" name='municipio' required fullWidth  label="Municipio" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item sm={6}>
                            <Grid item sm={12}>
                                <TextField id="pais" name='pais' required fullWidth  label="Pais" variant="outlined" onChange={handleInputChange} />
                            </Grid>
                             {/* <FormControl variant="filled" fullWidth className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Pais</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="selectPais"
                                    value={"Hola"}
                                    onChange={handleChange}
                                    >
                                    <MenuItem >
                                        <em>None</em>
                                    </MenuItem>
                                        {
                                            pais.map((item)=>(
                                                <MenuItem value={item.alpha2Code} name={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>  */}
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="codigoPostal" name='codigoPostal' required  fullWidth label="Codigo postal" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="correoElectronico" name='correoElectronico' required fullWidth label="Correo Electronico" variant="outlined" onChange={handleInputChange}  />
                            </Grid>

                    </Grid>
                                       
                    <h1>Configuracion API Keys</h1>
                        <Typography>
                                    Ingreso de Informacion de API Keys del Certificador
                        </Typography>
                        <Box mt={5}>
                             
                             </Box>
                        <Grid container spacing={2}>
                        <Grid item  sm={6} >
                                 <TextField id="apiGeneral" name='apiGeneral' required fullWidth  label="API Key General" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item sm={6} >
                                <TextField id="apiCertificado" name='apiCertificado' fullWidth required label="API Key Certificado" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="prefijo" name='prefijo' required fullWidth label="Prefijo FEL" variant="outlined" onChange={handleInputChange}  />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="correoCopia" name='correoCopia' required fullWidth label="Correo PDF" variant="outlined" onChange={handleInputChange}  />
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
