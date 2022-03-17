import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrentOnArtByAgeSex = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCurrentOnArtByAgeSex());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().currentOnArtByAgeSex.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'txCurr' &&
            getState().ui.ctTab !== 'txOpt' &&
            getState().ui.ctTab !== 'advEv' &&
            getState().ui.ctTab !== 'dsd' &&
            tab !== 'dsd' &&
            tab !== 'txCurr' &&
            tab !== 'txOpt' &&
            tab !== 'advEv' &&
            getState().ui.currentPage !== PAGES.home
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCurrentOnArtByAgeSex());
        }
    }
};

export const fetchCurrentOnArtByAgeSex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_BY_AGE_SEX_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/txCurrByAgeAndSex', params);
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_BY_AGE_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
