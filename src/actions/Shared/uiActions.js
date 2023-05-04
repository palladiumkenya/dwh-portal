import * as actionTypes from '../types';

export const changeCurrentPage = page => ({
    type: actionTypes.CHANGE_CURRENT_PAGE,
    payload: { page }
});

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

export const changeOpertationalHISTab = tab => ({
    type: actionTypes.CHANGE_OPERATIONAL_AND_HIS_TAB,
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

export const changeSdTab = tab => ({
    type: actionTypes.CHANGE_SD_TAB,
    payload: { tab }
});

export const changePmtctRRITab = tab => ({
    type: actionTypes.CHANGE_PMTCT_RRI_TAB,
    payload: { tab }
});
