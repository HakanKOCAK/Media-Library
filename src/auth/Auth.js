import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import authService from '../services/auth.service';

class Auth extends Component {
    state = {
        waitAuthCheck: true
    }

    componentDidMount() {
        return Promise.all([
            this.authCheck()
        ]).then(() => {
            this.setState({ waitAuthCheck: false })
        })
    }

    authCheck = () => new Promise(resolve => {
        authService.onAuthStateChanged(authUser => {
            if (!authUser) {
                this.props.removeUserData();
                resolve();
            }
            const isLoggedIn = localStorage.getItem('medialibrary.user.token')
            const isExpired = Date.now() > localStorage.getItem('medialibrary.user.token.expiresAt')
            if (isLoggedIn && !isExpired) {
                this.props.setUserData(authUser.email);
                resolve();
            } else {
                this.props.removeUserData();
                resolve();
            }
            resolve();
        })

        return Promise.resolve();
    })

    render() {
        return this.state.waitAuthCheck ? <div>Loading...</div> : <React.Fragment children={this.props.children} />;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserData: userActions.setUserData,
        removeUserData: userActions.removeUserData
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);