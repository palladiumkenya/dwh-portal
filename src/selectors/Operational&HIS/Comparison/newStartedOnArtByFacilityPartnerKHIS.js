import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtByFacilityKHIS.listUnfiltered;
const listFiltered = state => state.newOnArtByFacilityKHIS.listFiltered;
const listUnfilteredDWH = state => state.newOnArtByFacilityDWH.listUnfiltered;
const listFilteredDWH = state => state.newOnArtByFacilityDWH.listFiltered;
const filtered = state => state.filters.filtered;
let datimAgeGroups = (state) => state.filters.datimAgeGroups;


export const getNewOnArtByFacilityPartnerKHIS = createSelector(
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
                        item.NewART1 += item.StartARTUnder_1;
                    });
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    list.map((item) => {
                        item.KHISMale1 += 0;
                        item.KHISFemale1 += 0;
                        item.NewART1 += item.StartART1_9;
                    });
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    list.map((item) => {
                        item.KHISMale1 += item.StartART10_14_M;
                        item.KHISFemale1 += item.StartART10_14_F;
                        item.NewART1 +=
                            item.StartART10_14_M + item.StartART10_14_F;
                    });
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    list.map((item) => {
                        item.KHISMale1 += item.StartART15_19_M;
                        item.KHISFemale1 += item.StartART15_19_F;
                        item.NewART1 +=
                            item.StartART15_19_M + item.StartART15_19_F;
                    });
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    list.map((item) => {
                        item.KHISMale1 += item.StartART20_24_M;
                        item.KHISFemale1 += item.StartART20_24_F;
                        item.NewART1 +=
                            item.StartART20_24_M + item.StartART20_24_F;
                    });
                }
                if (datimAgeGroups[i] === '25+') {
                    list.map((item) => {
                        item.KHISMale1 += item.StartART25_Plus_M;
                        item.KHISFemale1 += item.StartART25_Plus_F;
                        item.NewART1 +=
                            item.StartART25_Plus_M + item.StartART25_Plus_F;
                    });
                }
            }
            list.map((item) => {
                item.KHIStxCurr = item.NewART1;
                item.KHISMale = item.KHISMale1;
                item.KHISFemale = item.KHISFemale1;
            });
        }
        list.forEach((item) => {
            const mfl = listDWH.find((code) => code?.MFLCode === item.SiteCode);
            if (mfl) {
                data.push({
                    ...item,
                    ...mfl,
                    concordance:
                        item.KHIStxNew > 0 ? Math.round(
                            (((item.KHIStxNew - mfl.DWHtxNew) * 100) /
                                item.KHIStxNew) *
                                100
                        ) / 100 : null,
                });
            }
        });

        return {
            data,
        };
    }
);
