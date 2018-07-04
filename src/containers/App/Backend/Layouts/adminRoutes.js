import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
    return <div>Loading...</div>;
}

const Home = Loadable({
    loader: () => import('../Home/index'),
    loading: Loading,
});

// Users
const UserList = Loadable({
    loader: () => import('../Access/Users/List'),
    loading: Loading,
});

const UserEditor = Loadable({
    loader: () => import( '../Access/Users/Editor'),
    loading: Loading,
});

const UserView = Loadable({
    loader: () => import( '../Access/Users/View'),
    loading: Loading,
});

// Roles
const RoleList = Loadable({
    loader: () => import( '../Access/Roles/List'),
    loading: Loading,
});

const adminRoutes = [
    {path: '/dashboard', name: 'Dashboard', component: Home},
    {path: '/access', exact: true, name: 'Access', component: UserList},
    {path: '/access/user', exact: true, name: 'Users', component: UserList},
    {path: '/access/user/create', exact: true, name: 'Create', component: UserEditor},
    {path: '/access/user/update/:id', exact: true, name: 'Update', component: UserEditor},
    {path: '/access/user/view/:id', exact: true, name: 'View', component: UserView},

    // Roles
    {path: '/access/role', exact: true, name: 'Roles', component: RoleList},
];

export default adminRoutes;
