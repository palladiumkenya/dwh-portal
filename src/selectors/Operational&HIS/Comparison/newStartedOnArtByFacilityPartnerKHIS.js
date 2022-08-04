import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtByFacilityKHIS.listUnfiltered;
const listFiltered = state => state.newOnArtByFacilityKHIS.listFiltered;
const listUnfilteredDWH = state => state.newOnArtByFacilityDWH.listUnfiltered;
const listFilteredDWH = state => state.newOnArtByFacilityDWH.listFiltered;
const filtered = state => state.filters.filtered;


export const getNewOnArtByFacilityPartnerKHIS = createSelector(
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
