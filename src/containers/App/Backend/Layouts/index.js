import React, {Component} from 'react';
import { compose } from 'redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
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

import injectReducer from 'utils/injectReducer';
import { getToken } from 'utils/requests';
import reducer from '../backendCommonReducer';
import authAgent from '../Auth/agent';
import { APP_LOAD } from 'constants/actionTypes';

// sidebar nav config
import { navigation } from '../Routes';

// routes config
import { adminRoutes } from '../Routes';

// Side Bar
import AdmintAside from './Aside';

// Footer
import AdminFooter from './Footer';

// Header
import AdminHeader from './Header';

import { BACKEND_REDIRECT } from '../constant';

class AdminLayout extends Component {
    // constructor(props) {
    //     super(props);
    //     this.props.onLoad(getToken() ? authAgent.current() : null, getToken());
    // }

    componentDidMount() {
        this.props.onLoad(getToken() ? authAgent.current() : null, getToken());
    }

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
        ...state.backendCommon,
        currentUser: state.common.currentUser,
    }
};

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({ type: BACKEND_REDIRECT }),
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
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