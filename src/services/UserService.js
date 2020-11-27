import { UserManager } from 'oidc-client';
import { storeUser, storeUserError } from '../actions/AuthActions';
let config = {};

if(process.env.NODE_ENV.trim() === 'production') {
    config = {
        authority: "https://auth.kenyahmis.org/dwhidentity",
        client_id: "dwh.spa",
        redirect_uri: "http://localhost:3000/signin-oidc",
        response_type: "id_token token",
        scope: "openid profile apiApp",
        post_logout_redirect_uri: "http://localhost:3000",
    }
} else {
    config = {
        authority: "https://localhost:5001",
        client_id: "dwh.spa",
        redirect_uri: "http://localhost:3000/signin-oidc",
        response_type: "id_token token",
        scope: "openid profile apiApp",
        post_logout_redirect_uri: "http://localhost:3000",
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
    return userManager.signinRedirectCallback();
}

export async function signoutRedirect() {
    let user = await userManager.getUser();
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirect({ 'id_token_hint': user.id_token });
}

export function signoutRedirectCallback() {
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirectCallback();
}

export default userManager;


