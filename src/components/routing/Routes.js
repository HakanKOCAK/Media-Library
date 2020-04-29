import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Register';
import Login from '../Login';
import NoMatch from '../NoMatch';
import GetFiles from '../../files/GetFiles';
import Files from '../files/Files'
import FileDetails from '../files/FileDetails'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes = () => {
    return (
        <section className="container">
            <Switch>
                <PublicRoute exact path="/register" component={Register} />
                <PublicRoute exact path="/login" component={Login} />
                <GetFiles>
                    <PrivateRoute exact path="/files" component={Files} />
                    <PrivateRoute exact path="/files/:id" component={FileDetails} />
                </GetFiles>
                <Route exact path="/error-404" component={NoMatch} />
                <Redirect from="*" to='/error-404' />
            </Switch>
        </section>
    );
};

export default Routes;