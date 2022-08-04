import { createSelector } from 'reselect';

const listUnfiltered = state => state.currOnArtKHISByPartner.listUnfiltered;
const listFiltered = state => state.currOnArtKHISByPartner.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.currentOnArtByPartner.listUnfiltered;
const listFilteredDWH = state => state.currentOnArtByPartner.listFiltered;

let datimAgeGroups = (state) => state.filters.datimAgeGroups;

export const getCurrentOnARTByPartnerKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH, datimAgeGroups],
    (listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH, datimAgeGroups) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

        const labels = list.map((item) => item.SDP ? item.SDP.toUpperCase() : 'NO PARTNER');
        let data = [];

        if (filtered && datimAgeGroups.length>0) {
            list.map((item) => (item.OnART1 = 0));
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    list.map((item) => {
                        item.OnART1 += item.OnARTUnder_1;
                    });
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    list.map((item) => {
                        item.OnART1 += item.OnART1_9;
                    });
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    list.map((item) => {
                        item.OnART1 += item.OnART10_14;
                    });
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    list.map((item) => {
                        item.OnART1 += item.OnART15_19;
                    });
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    list.map((item) => {
                        item.OnART1 += item.OnART20_24;
                    });
                }
                if (datimAgeGroups[i] === '25+') {
                    list.map((item) => {
                        item.OnART1 += item.OnART25_Plus;
                    });
                }
            }

            data = list.map((item) => item.OnART1);
        } else {
            data = list.map((item) => item.OnART);
        }

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
