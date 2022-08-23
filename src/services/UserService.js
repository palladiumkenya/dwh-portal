import { UserManager } from 'oidc-client';
import { storeUser, storeUserError } from '../actions/Shared/AuthActions';
let config = {};

if(process.env) {
    config = {
        authority: process.env.REACT_APP_AUTHORITY,
        client_id: process.env.REACT_APP_CLIENT,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        response_type: 'id_token token',
        scope: process.env.REACT_APP_SCOPE,
        post_logout_redirect_uri:
            process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
        filterProtocolClaims: process.env.REACT_APP_FILTER_PROTOCOL_CLAIMS,
    };
} else {
//         client_id: process.env.REACT_APP_CLIENT,
    config = {
        authority: "https://auth.kenyahmis.org/dwhidentity",
        client_id: "dwh.spa",
        redirect_uri: "https://data.kenyahmis.org:9000/#/signin-oidc#",
        response_type: "id_token token",
        scope: "openid profile apiApp",
        post_logout_redirect_uri: "https://data.kenyahmis.org:9000",
    }
}

const userManager = new UserManager(config);

export async function loadUserFromStorage(store) {
    try {
        let user = await userManager.getUser();
        if (!user) { return store.dispatch(storeUserError()); }
        store.dispatch(storeUser(user));
    } catch (e) {
        console.error(`User not found: ${e}`)
        store.dispatch(storeUserError())
    }
}

export function signinRedirect() {
    return userManager.signinRedirect();
}

export function signinRedirectCallback() {
    if (window.location.hash) {
        try {
            return userManager.signinRedirectCallback();
        }
        catch (e) {
            console.log(e);
        }
    } else {
        return userManager.signinRedirectCallback();
    }
}

export async function signoutRedirect() {
    let user = await userManager.getUser();
    await userManager.clearStaleState();
    await userManager.removeUser();
    return userManager.signoutRedirect({ 'id_token_hint': user.id_token });
}

export function signoutRedirectCallback() {
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirectCallback();
}

export default userManager;


