import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
  return <div>Loading...</div>;
}

// Home
const Home = Loadable({
  loader: () => import('../Home/index'),
  loading: Loading,
});

// Users
const UserList = Loadable({
  loader: () => import('../Access/Users/List'),
  loading: Loading,
});

const UserForm = Loadable({
  loader: () => import('../Access/Users/Form'),
  loading: Loading,
});

const UserView = Loadable({
  loader: () => import('../Access/Users/View'),
  loading: Loading,
});

// Roles
const RoleList = Loadable({
  loader: () => import('../Access/Roles/List'),
  loading: Loading,
});

const RoleForm = Loadable({
  loader: () => import('../Access/Roles/Form'),
  loading: Loading,
});

const RoleView = Loadable({
  loader: () => import('../Access/Roles/View'),
  loading: Loading,
});

// Permissions
const PermissionList = Loadable({
  loader: () => import('../Access/Permissions/List'),
  loading: Loading,
});

const PermissionForm = Loadable({
  loader: () => import('../Access/Permissions/Form'),
  loading: Loading,
});

const PermissionView = Loadable({
  loader: () => import('../Access/Permissions/View'),
  loading: Loading,
});

const adminRoutes = [
  { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/access', exact: true, name: 'Access', component: UserList },
  { path: '/access/user', exact: true, name: 'Users', component: UserList },
  {
    path: '/access/user/create',
    exact: true,
    name: 'Create',
    component: UserForm,
  },
  {
    path: '/access/user/update/:id',
    exact: true,
    name: 'Update',
    component: UserForm,
  },
  {
    path: '/access/user/view/:id',
    exact: true,
    name: 'View',
    component: UserView,
  },

  // Roles
  {
    path: '/access/role',
    exact: true,
    name: 'Roles',
    component: RoleList,
  },
  {
    path: '/access/role/create',
    exact: true,
    name: 'Create',
    component: RoleForm,
  },
  {
    path: '/access/role/update/:id',
    exact: true,
    name: 'Update',
    component: RoleForm,
  },
  {
    path: '/access/role/view/:id',
    exact: true,
    name: 'View',
    component: RoleView,
  },

  // Permissions
  {
    path: '/access/permission',
    exact: true,
    name: 'Permissions',
    component: PermissionList,
  },
  {
    path: '/access/permission/create',
    exact: true,
    name: 'Create',
    component: PermissionForm,
  },
  {
    path: '/access/permission/edit/:id',
    exact: true,
    name: 'Update',
    component: PermissionForm,
  },
  {
    path: '/access/permission/view/:id',
    exact: true,
    name: 'View',
    component: PermissionView,
  },
];

export default adminRoutes;
