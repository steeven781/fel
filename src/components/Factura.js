import React, {useState, useEffect} from 'react';
import DashboardContent from '../layout/layout';
import { Container, Grid, FilledInput, InputAdornment, IconButton, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@material-ui/core';


export  const Factura = () =>{


    const [valueCalendar, setValueCalendar] = React.useState(null);

    const [datosCliente, setDatosCliente] = useState({
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
        setDatosCliente({
            ...datosCliente,
            [event.target.name]:event.target.value
        })
    }

    return ( 
            
            <DashboardContent>
                    <main >
                            <h1>Crear Nueva Factura</h1>  
                            <Container component="main" maxWidth='md'>
                            <Box mt={4}></Box>
                            <Typography>
                                        Ingrese la informacion del cliente
                            </Typography>
                            <Box mt={4}></Box>
                                <Grid container spacing={2}>
                                    <Grid item  sm={4} >
                                            <TextField id="nitCliente" name='nitCliente' required fullWidth  label="Ingrese NIT" variant="outlined" onChange="" />
                                    </Grid>
                                    <Grid item  sm={8} >
                                            <TextField id="nombreCliente" name='nombreCliente' required fullWidth  label="Ingrese Nombre" variant="outlined" onChange="" />
                                    </Grid>
                                    <Grid item  sm={12} >
                                            <TextField id="direccionCliente" name='direccionCliente' required fullWidth  label="Ingrese Direccion" variant="outlined" onChange="" />
                                    </Grid>
                                    <Grid item  sm={4} >
                                            <TextField id="departamentoCliente" name='departamentoCliente' InputProps={{readOnly: true,}} defaultValue="Departamento"  fullWidth  label="Departamento" variant="outlined" onChange="" />
                                    </Grid>
                                    <Grid item  sm={4} >
                                            <TextField id="municipioCliente" name='municipioCliente' InputProps={{readOnly: true,}} defaultValue="Municipio" fullWidth  label="Municipio" variant="outlined" onChange="" />
                                    </Grid>
                                    <Grid item  sm={4} >
                                            <TextField id="paisCliente" name='paisCliente' InputProps={{readOnly: true,}} defaultValue="Pais" fullWidth  label="Pais" variant="outlined" onChange="" />
                                    </Grid>
                                    <Grid item  sm={4} >
                                    </Grid>
                                    
                                </Grid>
                            </Container> 

                </main> 
            </DashboardContent>

    );
}