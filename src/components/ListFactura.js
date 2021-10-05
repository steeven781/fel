import React, { useState } from 'react';
import Layout from '../layout/layout';
import {useStyles} from '../layout/layoutStyle';
import { DataGrid } from '@mui/x-data-grid';



export  const ListFactura = () =>{
    const classes = useStyles();

    const getCurrentDate=(separator='-')=>{

        const myCurrentDate = new Date()
        const date = myCurrentDate.getDate();
        const month = myCurrentDate.getMonth() + 1;
        const year = myCurrentDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

    const dummyFacturas=[
        {id:1,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"150.00",Cliente:"12345678K"},
        {id:2,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"500.00",Cliente:"12345678K"},
        {id:3,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"250.00",Cliente:"12345678K"},
        {id:4,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"350.00",Cliente:"12345678K"},
        {id:5,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"800.00",Cliente:"12345678K"},
        {id:6,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"1540.00",Cliente:"12345678K"},
        {id:7,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"2540.00",Cliente:"12345678K"},
        {id:8,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"150.00",Cliente:"12345678K"},
        {id:9,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"100.00",Cliente:"12345678K"},
        {id:10,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"90.00",Cliente:"12345678K"},
        {id:11,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"2500.00",Cliente:"12345678K"},
        {id:12,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"170.00",Cliente:"12345678K"},
        {id:13,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"180.00",Cliente:"12345678K"},
        {id:14,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"190.00",Cliente:"12345678K"},
        {id:15,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"130.00",Cliente:"12345678K"},
        {id:16,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"570.00",Cliente:"12345678K"},
        {id:17,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"870.00",Cliente:"12345678K"},
        {id:18,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"950.00",Cliente:"12345678K"},
        {id:19,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"870.00",Cliente:"12345678K"},
        {id:20,UUID:"ABCDE-1234-1234-2134-AVBDER", Numero:"654987321",Fecha:getCurrentDate(),Monto:"510.00",Cliente:"12345678K"}
    ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        {
          field: 'id',
          headerName: 'id',
          width: 90,
          editable: false,
        },
        {
          field: 'UUID',
          headerName: 'UUID',
          width: 230,
          editable: false,
        },
        {
          field: 'Numero',
          headerName: 'Numero',
          type: 'number',
          width: 130,
          editable: false,
        },
        {
            field: 'Fecha',
            headerName: 'Fecha',
            type: 'date',
            width: 120,
            editable: false,
          },
          {
            field: 'Monto',
            headerName: 'Monto',
            type: 'number',
            width: 120,
            editable: false,
          },
          {
            field: 'Cliente',
            headerName: 'Cliente',
            width: 130,
            editable: false,
          }        
      ];

    const [facturas, setFacturas] = useState(dummyFacturas);

    return (  
        <div className={classes.root}>
            <Layout/>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
                    <h1>Listado de Facturas</h1>  
                    <div style={{ height: 580, width: '100%' }}>
                     <DataGrid
                        rows={dummyFacturas}
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