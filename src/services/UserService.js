import { UserManager } from 'oidc-client';
import { storeUser, storeUserError } from '../actions/Shared/AuthActions';
let config = {};

if(process.env.NODE_ENV.trim() === 'production') {
    config = {
        authority: "https://auth.kenyahmis.org/nascop",
        client_id: "nascop.spa",
        redirect_uri: "https://dwh.nascop.org/#/signin-oidc#",
        response_type: "id_token token",
        scope: "openid profile apiApp",
        post_logout_redirect_uri: "https://dwh.nascop.org",
    }
} else {
    config = {
        authority: "https://localhost:5006",
        client_id: "dwh.spa",
        redirect_uri: "http://localhost:3000/#/signin-oidc#",
        response_type: "id_token token",
        scope: "openid profile apiApp",
        post_logout_redirect_uri: "http://localhost:3000",
        filterProtocolClaims: true,
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


