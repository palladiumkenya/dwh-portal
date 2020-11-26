import * as actionTypes from './types';

export const enableStickyFilter = () => ({
    type: actionTypes.ENABLE_STICKY_FILTER,
    payload: {}
})

export const disableStickyFilter = () => ({
    type: actionTypes.DISABLE_STICKY_FILTER,
    payload: {}
});

export const changeHomeTab = tab => ({
    type: actionTypes.CHANGE_HOME_TAB,
    payload: { tab }
});

export const changeRRTab = tab => ({
    type: actionTypes.CHANGE_RR_TAB,
    payload: { tab }
});

export const changeHtsTab = tab => ({
    type: actionTypes.CHANGE_HTS_TAB,
    payload: { tab }
});

export const changeCtTab = tab => ({
    type: actionTypes.CHANGE_CT_TAB,
    payload: { tab }
});

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
