import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';

const Test = React.lazy(() => import('pages/Test/Test'));
const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/test', exact: true, name: 'Test', component: Test },
];

export const Routing = () => (
    <Switch>
        {routes.map((route, idx) => {
            return (
                route.component && (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                            <CFade>
                                <route.component {...props} />
                            </CFade>
                        )}
                    />
                )
            );
        })}
        <Redirect from="/" to="/dashboard" />
    </Switch>
);

export default Routing;
