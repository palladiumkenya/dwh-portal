import * as actionTypes from './types';

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