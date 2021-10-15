import React, { useState } from 'react';
import Layout from '../layout/layout';
import {useStyles} from '../layout/layoutStyle';
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@material-ui/core';


export  const ListFactura = () =>{
    const classes = useStyles();

    const getCurrentDate=(separator='-')=>{

        const myCurrentDate = new Date()
        const date = myCurrentDate.getDate();
        const month = myCurrentDate.getMonth() + 1;
        const year = myCurrentDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

        const renderDetailsButton = (params) => {
          return (
              <strong>
                <a target='blank' href={`https://report.feel.com.gt/ingfacereport/ingfacereport_documento?uuid=${params.row.UUID}`}>
                  <Button
                      variant="contained"
                      color="error"
                      size="small"
                      style={{ marginLeft: 16 }}
                  >
                      PDF
                  </Button>
                  </a>
              </strong>
          )
      }

    const dummyFacturas=[
        {id:1,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"150.00",Cliente:"12345678K"},
        {id:2,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"500.00",Cliente:"12345678K"},
        {id:3,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"250.00",Cliente:"12345678K"},
        {id:4,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"350.00",Cliente:"12345678K"},
        {id:5,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"800.00",Cliente:"12345678K"},
        {id:6,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"1540.00",Cliente:"12345678K"},
        {id:7,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"2540.00",Cliente:"12345678K"},
        {id:8,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"150.00",Cliente:"12345678K"},
        {id:9,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"100.00",Cliente:"12345678K"},
        {id:10,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"90.00",Cliente:"12345678K"},
        {id:11,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"2500.00",Cliente:"12345678K"},
        {id:12,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"170.00",Cliente:"12345678K"},
        {id:13,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"180.00",Cliente:"12345678K"},
        {id:14,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"190.00",Cliente:"12345678K"},
        {id:15,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"130.00",Cliente:"12345678K"},
        {id:16,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"570.00",Cliente:"12345678K"},
        {id:17,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"870.00",Cliente:"12345678K"},
        {id:18,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"950.00",Cliente:"12345678K"},
        {id:19,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"870.00",Cliente:"12345678K"},
        {id:20,UUID:"5317EE37-B8F2-4610-9A63-3F79607C4E33", Numero:"654987321",Fecha:getCurrentDate(),Monto:"510.00",Cliente:"12345678K"},
        {
          "UUID": "5EFF35D6-0AC4-4F18-A35E-97445A278EDA",
          "serie": "**PRUEBAS**",
          "numero": 180637464,
          "fecha": "2021-10-13T23:34:22-06:00",
          "cliente": "Consumidor Final",
          "monto": 750,
          "id": 1
        }
    ]

    const facturasCertificadas = JSON.parse(localStorage.getItem('facturasCertificadas')) || [];


    const columns = [
        {
          field: 'id',
          headerName: 'ID',
          width: 90,
          editable: false,
        },
        {
          field: 'UUID',
          headerName: 'UUID',
          width: 310,
          editable: false,
        },
        {
          field: 'numero',
          headerName: 'Numero',
          width: 130,
          editable: false,
        },
        {
          field: 'serie',
          headerName: 'Serie',
          type: 'number',
          width: 130,
          editable: false,
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            type: 'date',
            width: 120,
            editable: false,
          },
          {
            field: 'monto',
            headerName: 'Monto',
            type: 'number',
            width: 130,
            editable: false,
          },
          {
            field: 'cliente',
            headerName: 'Cliente',
            width: 130,
            editable: false,
          },
          {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            editable: false,
            renderCell: renderDetailsButton
          }

      ];



    return (  
        <div className={classes.root}>
            <Layout/>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
                    <h1>Listado de Facturas</h1>  
                    <div style={{ height: 580, width: '100%' }}>
                     <DataGrid
                        rows={facturasCertificadas}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                    </div> 
                    
            </main>
           
        </div>
    );
}