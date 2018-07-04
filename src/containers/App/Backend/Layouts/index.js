import React, {Component} from 'react';
import { compose } from 'redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducer from '../backendCommonReducer';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from './_nav';
// routes config
import adminRoutes from './adminRoutes';
import AdmintAside from './Aside';
import AdminFooter from './Footer';
import AdminHeader from './Header';
import { BACKEND_REDIRECT } from '../constant';

class AdminLayout extends Component {

    // componentDidMount() {
    //     const token = window.localStorage.getItem('jwt');
    //     if (token) {
    //         setToken(token);
    //     }
    //     this.props.onLoad(token ? authAgent.current() : null, token);
    // }

    componentWillReceiveProps(nextProps){
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <AdminHeader appName={this.props.appName}
                                 currentUser={this.props.currentUser}/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader/>
                        <AppSidebarForm/>
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={adminRoutes}/>
                        <Container fluid>
                            <Switch>
                                {adminRoutes.map((route, idx) => {
                                        return route.component ? (
                                                <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                                       render={props => (
                                                           <route.component {...props} />
                                                       )}/>)
                                            : (null);
                                    },
                                )}
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <AdmintAside/>
                    </AppAside>
                </div>
                <AppFooter>
                    <AdminFooter/>
                </AppFooter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.backendCommon
    }
};

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({ type: BACKEND_REDIRECT })
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'backendCommon', reducer });

export default compose(
    withReducer,
    withConnect,
)(AdminLayout);