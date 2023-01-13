import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.currOnArtByFacilityKHIS.listUnfiltered;
const listFiltered = state => state.currOnArtByFacilityKHIS.listFiltered;
const listUnfilteredDWH = state => state.currOnArtByFacilityDWH.listUnfiltered;
const listFilteredDWH = state => state.currOnArtByFacilityDWH.listFiltered;
const filtered = state => state.filters.filtered;
let datimAgeGroups = (state) => state.filters.datimAgeGroups;


export const getCurrOnArtByFacilityPartnerKHIS = createSelector(
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
                item.OnART1 = 0 
            })
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    list.map((item) => {
                        item.KHISMale1 += 0;
                        item.KHISFemale1 += 0;
                        item.OnART1 += item.OnARTUnder_1;
                    });
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    list.map((item) => {
                        item.KHISMale1 += 0;
                        item.KHISFemale1 += 0;
                        item.OnART1 += item.OnART1_9;
                    });
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    list.map((item) => {
                        item.KHISMale1 += item.OnART10_14_M;
                        item.KHISFemale1 += item.OnART10_14_F;
                        item.OnART1 += item.OnART10_14_M + item.OnART10_14_F;
                    });
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    list.map((item) => {
                        item.KHISMale1 += item.OnART15_19_M;
                        item.KHISFemale1 += item.OnART15_19_F;
                        item.OnART1 += item.OnART15_19_M + item.OnART15_19_F;
                    });
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    list.map((item) => {
                        item.KHISMale1 += item.OnART20_24_M;
                        item.KHISFemale1 += item.OnART20_24_F;
                        item.OnART1 += item.OnART20_24_M + item.OnART20_24_F;
                    });
                }
                if (datimAgeGroups[i] === '25+') {
                    list.map((item) => {
                        item.KHISMale1 += item.OnART25_Plus_M;
                        item.KHISFemale1 += item.OnART25_Plus_F;
                        item.OnART1 += item.OnART25_Plus_M + item.OnART25_Plus_F;
                    });
                }
            }
            list.map((item) => {
                item.KHIStxCurr = item.OnART1
                item.KHISMale = item.KHISMale1
                item.KHISFemale = item.KHISFemale1
            });
        }
        list.forEach((item) => {
            const mfl = listDWH.find((code) => code?.MFLCode === item.SiteCode);
            if (mfl) {
                data.push({
                    ...item,
                    ...mfl,
                    concordance: Math.round(
                        ((item.KHIStxCurr - mfl.DWHtxCurr) * 100) /
                            item.KHIStxCurr *100
                    )/100,
                });
            }
        });

        return {
            data,
        };
    }
);
