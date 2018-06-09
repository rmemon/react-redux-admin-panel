import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/admin';

function Loading() {
  return <div>Loading...</div>;
}


const Home = Loadable({
  loader: () => import('./containers/home/Home'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Home },  
];

export default routes;
