import React from 'react';
import Loadable from 'react-loadable'

import AdmintLayout from './containers/admin';

import { List as UserList } from './containers/admin/access/users';
import { Editor as UserEditor } from './containers/admin/access/users';
import { View as UserView } from './containers/admin/access/users';

function Loading() {
  return <div>Loading...</div>;
}


const Home = Loadable({
  loader: () => import('./containers/home/Home'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', exact: true, name: 'Dashboard', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/access', exact: true, name: 'Access', component: UserList },
  { path: '/access/user', exact: true, name: 'Users', component: UserList },
  { path: '/access/user/create', exact: true,  name: 'Create', component: UserEditor },
  { path: '/access/user/update/:id', exact: true,  name: 'Update', component: UserEditor },
  { path: '/access/user/view/:id', exact: true,  name: 'view', component: UserView },

];

export default routes;
