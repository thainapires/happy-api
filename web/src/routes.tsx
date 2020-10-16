import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import LibraryMap from './pages/LibraryMap';
import Library from './pages/Library';
import CreateLibrary from './pages/CreateLibrary';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={LibraryMap} />
                <Route path="/libraries/create" component={CreateLibrary} />
                <Route path="/libraries/:id" component={Library} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;