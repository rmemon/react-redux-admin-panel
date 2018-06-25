import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
    return <div>Loading...</div>;
}

const Home = Loadable({
    loader: () => import('./containers/home/Home'),
    loading: Loading,
});

const UserList = Loadable({
    loader: () => import( './containers/admin/access/users/list'),
    loading: Loading,
});

const UserEditor = Loadable({
    loader: () => import( './containers/admin/access/users/editor'),
    loading: Loading,
});

const UserView = Loadable({
    loader: () => import( './containers/admin/access/users/view'),
    loading: Loading,
});

const routes = [
    {path: '/dashboard', name: 'Dashboard', component: Home},
    {path: '/access', exact: true, name: 'Access', component: UserList},
    {path: '/access/user', exact: true, name: 'Users', component: UserList},
    {path: '/access/user/create', exact: true, name: 'Create', component: UserEditor},
    {path: '/access/user/update/:id', exact: true, name: 'Update', component: UserEditor},
    {path: '/access/user/view/:id', exact: true, name: 'view', component: UserView},

];

export default routes;
