import { setAuthHeader } from '../../utils/axiosHeaders';
import { LOADING_USER, STORE_USER, STORE_USER_ERROR, USER_EXPIRED, USER_SIGNED_OUT } from '../types';

export function storeUser(user) {
    setAuthHeader(user.access_token);
    return {
        type: STORE_USER,
        payload: user
    };
}

export function loadingUser() {
    return {
        type: LOADING_USER
    };
}

export function storeUserError() {
    return {
        type: STORE_USER_ERROR
    };
}

export function userExpired() {
    return {
        type: USER_EXPIRED
    };
}

export function userSignedOut() {
    return {
        type: USER_SIGNED_OUT
    };
}
