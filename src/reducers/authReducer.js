import { LOADING_USER, STORE_USER, STORE_USER_ERROR, USER_EXPIRED, USER_SIGNED_OUT } from '../actions/types';

const initialState = {
    user: null,
    isLoadingUser: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case STORE_USER:
            return {
                ...state,
                isLoadingUser: false,
                user: action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                isLoadingUser: true
            }
        case USER_EXPIRED:
        case STORE_USER_ERROR:
        case USER_SIGNED_OUT:
            return {
                ...state,
                user: null,
                isLoadingUser: false
            }
        default:
            return state
    }
}
