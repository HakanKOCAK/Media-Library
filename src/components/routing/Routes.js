import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Register';
import Login from '../Login';
import NoMatch from '../NoMatch';
import Files from '../files/Files'
import FileDetails from '../files/FileDetails'
import PrivateRoute from './PrivateRoute';

const Routes = props => {
    return (
        <section className="container">
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/files" component={Files} />
                <PrivateRoute exact path="/files/:id" component={FileDetails} />
                <Route exact path="/error-404" component={NoMatch} />
                <Redirect from="*" to='/error-404' />
            </Switch>
        </section>
    );
};

export default Routes;