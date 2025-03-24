import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.htsTestByCountyKHIS.listUnfiltered;
const listFiltered = (state) => state.htsTestByCountyKHIS.listFiltered;
const filtered = (state) => state.filters.filtered;

const listUnfilteredDWH = (state) => state.htsPosByCountyDWH.listUnfiltered;
const listFilteredDWH = (state) => state.htsPosByCountyDWH.listFiltered;

let datimAgeGroups = state => state.filters.datimAgeGroups;

export const getHTSTESTByCountyKHIS = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredDWH,
        listFilteredDWH,
        datimAgeGroups
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredDWH,
        listFilteredDWH,
        datimAgeGroups
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

        list.sort((b, a) =>
            a.Tested_Total > b.Tested_Total
                ? 1
                : b.Tested_Total > a.Tested_Total
                ? -1
                : 0
        );

        //KHIS
        const labels = list.map((item) =>
            item.County ? item.County.toUpperCase() : 'UNKNOWN'
        );
        let data = [];

        if (filtered && datimAgeGroups.length>0) {
            list.map((item) => item.OnART1 = 0 )
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    list.map((item) => {
                        item.OnART1 += 0;
                    });
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    list.map((item) => {
                        item.OnART1 += item.Tested_1_9;
                    });
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    list.map((item) => {
                        item.OnART1 += item.Tested_10_14_F + item.Tested_10_14_M;
                    });
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    list.map((item) => {
                        item.OnART1 += item.Tested_15_19_F + item.Tested_15_19_M;
                    });
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    list.map((item) => {
                        item.OnART1 += item.Tested_20_24_F + item.Tested_20_24_M;
                    });
                }
                if (datimAgeGroups[i] === '25+') {
                    list.map((item) => {
                        item.OnART1 += item.Tested_25_Plus_F + item.Tested_25_Plus_M;
                    });
                }
            }

            data = list.map((item) => item.OnART1);
        } else {
            data = list.map((item) => item.Tested_Total);
        }
        //DWH
        const dataDwh = labels.map((item) => {
            let number = 0;

            listDWH.length && listDWH.map((itemDWH) => {
                if (itemDWH.County !== null)
                    if (item === itemDWH.County.toUpperCase()) {
                        number = parseInt(itemDWH.tested);
                    } else if (item === 'UNKNOWN') {
                        number = itemDWH.tested;
                    }
            });
            return number;
        });

        return {
            data,
            labels,
            dataDwh,
        };
    }
);
