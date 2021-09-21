import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Configuracion} from './components/Configuracion';
import {Factura} from './components/Factura';
import {ListFactura} from './components/ListFactura';
import index from './layout/layout';


const Routes = () => {
        return ( 
            <Switch>
                <Route exact path='/' component={index}/>
                <Route  path="/Configuracion" component={Configuracion} />
                <Route  path="/Factura" component={Factura} />
                <Route  path="/ListFactura" component={ListFactura} />
            </Switch>
         );
}
 
export default Routes;