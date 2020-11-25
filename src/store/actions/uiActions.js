import * as actionTypes from './types';

export const enableStickyFilter = () => {
    console.log("enableStickyFilter");
    console.log(actionTypes.ENABLE_STICKY_FILTER);
    return {
        type: actionTypes.ENABLE_STICKY_FILTER,
        payload: {}
    };
}

export const disableStickyFilter = () => {
    console.log("disableStickyFilter");
    return {
    type: actionTypes.DISABLE_STICKY_FILTER,
    payload: {}
}};

export const enableFromDateFilter = () => ({
    type: actionTypes.ENABLE_FROM_DATE_FILTER,
    payload: {}
});

export const disableFromDateFilter = () => ({
    type: actionTypes.DISABLE_FROM_DATE_FILTER,
    payload: {}
});

export const enableToDateFilter = () => ({
    type: actionTypes.ENABLE_TO_DATE_FILTER,
    payload: {}
});

export const disableToDateFilter = () => ({
    type: actionTypes.DISABLE_TO_DATE_FILTER,
    payload: {}
});
