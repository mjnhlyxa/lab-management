import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';

import withAuth from 'utils/withAuth';
import Modal from 'components/modal/Modal';

const Test = React.lazy(() => import('pages/Test/Test'));
const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
const UserManagement = React.lazy(() => import('pages/users/UserManagement'));
const RoleManagement = React.lazy(() => import('pages/roles/RoleManagement'));
const LocationManagement = React.lazy(() => import('pages/locations/LocationManagement'));
const LaboratoryManagement = React.lazy(() => import('pages/labs/LaboratoryManagement'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/test', exact: true, name: 'Test', component: Test },
    { path: '/users', exact: true, name: 'User Management', component: UserManagement },
    { path: '/roles', exact: true, name: 'Roles Management', component: RoleManagement },
    { path: '/laboratoryMngt', exact: true, name: 'Locations Management', component: LaboratoryManagement },
    { path: '/location', exact: true, name: 'Locations Management', component: LocationManagement },
];

export const Routing = () => (
    <>
        <Modal />
        <Switch>
            {routes.map((route, idx) => {
                return (
                    route.component && (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            component={withAuth((props) => (
                                <CFade>
                                    <route.component {...props} />
                                </CFade>
                            ))}
                        />
                    )
                );
            })}
            <Redirect from="/" to="/dashboard" />
        </Switch>
    </>
);

export default Routing;
