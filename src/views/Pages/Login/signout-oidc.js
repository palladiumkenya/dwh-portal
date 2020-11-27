
import React, { useEffect } from 'react'
import { signoutRedirect } from '../../../services/UserService';
import { useHistory } from 'react-router-dom';

function SignoutOidc() {
    const history = useHistory();

    useEffect(() => {
        async function signoutAsync() {
            await signoutRedirect();
            history.push('/')
        }
        signoutAsync();
    }, [history]);

    return (
        <div>
            Redirecting...
        </div>
    )
}

export default SignoutOidc;
