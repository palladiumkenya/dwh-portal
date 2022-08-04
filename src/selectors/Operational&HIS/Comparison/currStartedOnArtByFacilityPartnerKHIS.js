import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.currOnArtByFacilityKHIS.listUnfiltered;
const listFiltered = state => state.currOnArtByFacilityKHIS.listFiltered;
const listUnfilteredDWH = state => state.currOnArtByFacilityDWH.listUnfiltered;
const listFilteredDWH = state => state.currOnArtByFacilityDWH.listFiltered;
const filtered = state => state.filters.filtered;


export const getCurrOnArtByFacilityPartnerKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH],
    (listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

        let data = []
        list.forEach(item => {
            const mfl = listDWH.find(code =>  code?.MFLCode === item.SiteCode);
            if (mfl) {
                data.push({
                    ...item,
                    ...mfl
                });
            }
        })


        return {
            data
        };
    }
);
