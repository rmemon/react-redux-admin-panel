import React from 'react';
import Loadable from 'react-loadable'

import AdmintLayout from './containers/admin';

import { List as UserList } from './containers/admin/access/users'

function Loading() {
  return <div>Loading...</div>;
}


const Home = Loadable({
  loader: () => import('./containers/home/Home'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Home },
  // { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/access', name: 'Users', component: UserList },
  { path: '/access/users', name: 'Users', component: UserList },
];

export default routes;
