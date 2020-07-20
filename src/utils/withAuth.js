import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const LOGIN_URL = '/login';

export const withAuth = (WrappedComponent) => {
    const Wrapper = ({ authorized, ...rest }) => {
        useEffect(() => {
            if (!sessionStorage.getItem('token')) {
                const { history } = rest;
                history.push(LOGIN_URL);
            }
        }, []);
        return <WrappedComponent {...rest} />;
    };

    const mapStateToProps = ({ login: { user } }) => {
        return {
            authorized: Boolean(user),
        };
    };

    return connect(mapStateToProps)(Wrapper);
};

export default withAuth;
