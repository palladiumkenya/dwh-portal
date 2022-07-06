import { createSelector } from 'reselect';

const listUnfiltered = state => state.currOnArtKHISByPartner.listUnfiltered;
const listFiltered = state => state.currOnArtKHISByPartner.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.currentOnArtByPartner.listUnfiltered;
const listFilteredDWH = state => state.currentOnArtByPartner.listFiltered;


export const getCurrentOnARTByPartnerKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH],
    (listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

        const labels = list.map((item) => item.partner ? item.partner.toUpperCase() : 'NO PARTNER');
        const data = list.map(item => item.OnART);

        const dataDwh = labels.map(item => {
            let number = 0;
            listDWH.map(itemDWH => {
                if (item === itemDWH.CTPartner.toUpperCase()) {
                    number = itemDWH.txCurr;
                }
            })
            return number;
        });


        return {
            data, labels, dataDwh
        };
    }
);
