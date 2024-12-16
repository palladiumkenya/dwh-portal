import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadLinkageNumberNotLinkedByFacility = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchLinkageNumberNotLinkedByFacility());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().linkageNumberNotLinkedByFacility.lastFetch),
            'minutes'
        );
        if (getState().ui.htsTab !== 'linkage') {
            return;
        }
        else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchLinkageNumberNotLinkedByFacility());
        }
    }
};

export const fetchLinkageNumberNotLinkedByFacility = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HTS_LINKAGE_NUMBER_NOT_LINKED_BY_FACILITY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : '',
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : '',
        fromDate: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYYMM')
            : moment().subtract(2, 'month').add(10, 'days').format('YYYYMM'),
        toDate: getState().filters.toDate
            ? moment(getState().filters.toDate, 'MMM YYYY').format('YYYYMM')
            : moment().subtract(2, 'month').add(10, 'days').format('YYYYMM'),
    };
    const response = await getAll('hts/linkageNumberNotLinkedByFacility', params);
    dispatch({ type: actionTypes.HTS_LINKAGE_NUMBER_NOT_LINKED_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
