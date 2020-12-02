import React from 'react';
import { Route  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signinRedirect } from '../services/UserService';

function ProtectedRoute({ children, component: Component, ...rest }) {
    const user = useSelector(state => state.auth.user)
    if (user) {
        return (<Route {...rest} component={Component} />);
    } else {
        return (
            <div>
                Redirecting....
                {
                    setTimeout(() => {
                        signinRedirect();
                    }, 2000)
                }
            </div>
        );
    }
}

export default ProtectedRoute;
