import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.htsTestByFacilityKHIS.listUnfiltered;
const listFiltered = (state) => state.htsTestByFacilityKHIS.listFiltered;

const listUnfilteredDWH = (state) => state.htsPosByFacilityDWH.listUnfiltered;
const listFilteredDWH = (state) => state.htsPosByFacilityDWH.listFiltered;

const filtered = state => state.filters.filtered;
let datimAgeGroups = (state) => state.filters.datimAgeGroups;


export const getHTSTestByFacilityPartnerKHIS = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredDWH,
        listFilteredDWH,
        datimAgeGroups,
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

        let data = [];

        if (filtered && datimAgeGroups.length>0) {
            list.map((item) => {
                item.KHISMale1 = 0;
                item.KHISFemale1 = 0;
                item.NewART1 = 0;
            });
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    list.map((item) => {
                        item.KHISMale1 += 0;
                        item.KHISFemale1 += 0;
                        item.NewART1 += 0;
                    });
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    list.map((item) => {
                        item.KHISMale1 += 0;
                        item.KHISFemale1 += 0;
                        item.NewART1 += item.Tested_1_9;
                    });
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    list.map((item) => {
                        item.KHISMale1 += item.Tested_10_14_M;
                        item.KHISFemale1 += item.Tested_10_14_F;
                        item.NewART1 +=
                            item.Tested_10_14_M + item.Tested_10_14_F;
                    });
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    list.map((item) => {
                        item.KHISMale1 += item.Tested_15_19_M;
                        item.KHISFemale1 += item.Tested_15_19_F;
                        item.NewART1 +=
                            item.Tested_15_19_M + item.Tested_15_19_F;
                    });
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    list.map((item) => {
                        item.KHISMale1 += item.Tested_20_24_M;
                        item.KHISFemale1 += item.Tested_20_24_F;
                        item.NewART1 +=
                            item.Tested_20_24_M + item.Tested_20_24_F;
                    });
                }
                if (datimAgeGroups[i] === '25+') {
                    list.map((item) => {
                        item.KHISMale1 += item.Tested_25_Plus_M;
                        item.KHISFemale1 += item.Tested_25_Plus_F;
                        item.NewART1 +=
                            item.Tested_25_Plus_M + item.Tested_25_Plus_F;
                    });
                }
            }
            list.map((item) => {
                item.Tested_Total = item.NewART1;
                item.KHISMale = item.KHISMale1;
                item.KHISFemale = item.KHISFemale1;
            });
        }
        list.length && list.forEach((item) => {
            const mfl = listDWH.find((code) => code?.Mflcode == item.SiteCode);
            if (mfl) {
                data.push({
                    ...item,
                    ...mfl,
                    concordance:
                        item.Tested_Total > 0
                            ? Math.round(
                                  (((item.Tested_Total - parseInt(mfl.tested)) *
                                      100) /
                                      item.Tested_Total) *
                                      100
                              ) / 100
                            : null,
                });
            }
        });

        return {
            data,
        };
    }
);
