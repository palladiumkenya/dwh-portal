import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOvcDistributionOfPatientsByAgeSex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().OvcDistributionOfPatientsByAgeSex.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'ovc' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOvcDistributionOfPatientsByAgeSex());
    }
}

export const fetchOvcDistributionOfPatientsByAgeSex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OVC_DISTRIBUTION_OF_PATIENTS_BY_AGE_SEX_REQUEST });
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
    const response = await getAll('care-treatment/getDistributionOfOvcClientsByAgeSex', params);
    dispatch({ type: actionTypes.CT_OVC_DISTRIBUTION_OF_PATIENTS_BY_AGE_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
