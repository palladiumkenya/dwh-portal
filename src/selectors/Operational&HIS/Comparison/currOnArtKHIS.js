import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.currOnArtKHIS.listUnfiltered;
const listFiltered = state => state.currOnArtKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFilteredDWH = state => state.currentOnArtByAgeSex.listFiltered;



export const getCurrOnArtKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH],
    (listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

        const totalOnART = list.CurrentOnART_Total;
        const malesOnART = list.On_ART_25_Plus_M + list.On_ART_20_24_M + list.On_ART_15_19_M + list.On_ART_10_14_M;
        const femalesOnART = list.On_ART_25_Plus_F + list.On_ART_20_24_F + list.On_ART_15_19_F + list.On_ART_10_14_F;
        const adultsOnART = list.On_ART_15_19_F + list.On_ART_15_19_M + list.On_ART_20_24_F + list.On_ART_20_24_M + list.On_ART_25_Plus_F + list.On_ART_25_Plus_M;
        const childrenOnART = list.On_ART_10_14_F + list.On_ART_10_14_M + list.On_ART_1_9 + list.On_ART_Under_1;
        const adolescentsOnART = list.On_ART_10_14_F + list.On_ART_10_14_M + list.On_ART_15_19_M + list.On_ART_15_19_F;

        const OnARTByAge = [
            list.On_ART_Under_1||0,
            list.On_ART_1_9||0,
            (list.On_ART_10_14_M || 0) + (list.On_ART_10_14_F || 0),
            (list.On_ART_15_19_M || 0) + (list.On_ART_15_19_F || 0),
            (list.On_ART_20_24_M ||0) + (list.On_ART_20_24_F || 0),
            (list.On_ART_25_Plus_M || 0) + (list.On_ART_25_Plus_F || 0)
        ];

        //DWH
        let under1 = ['<1'];
        let oneToNine = ["1-4", "5-9"]
        let tenToFourteen = ["10-14"]
        let fifteenToNineteen = ["15-19"]
        let twentyToTwentyFour = ["20-24"]
        let twentyFivePlus = ["25-29", "30-34", "35-39", "40-44","45-49", "50-54", "55-59","60-64", "65+"]

        let OnARTByAgeDWH = [loopAgeGroups(listDWH, under1), loopAgeGroups(listDWH, oneToNine), loopAgeGroups(listDWH, tenToFourteen), loopAgeGroups(listDWH, fifteenToNineteen), loopAgeGroups(listDWH, twentyToTwentyFour), loopAgeGroups(listDWH, twentyFivePlus)];
        console.log(OnARTByAgeDWH);
        return {
            totalOnART,
            malesOnART,
            femalesOnART,
            adultsOnART,
            childrenOnART,
            adolescentsOnART,
            OnARTByAge,
            OnARTByAgeDWH
        };
    }
);
const loopAgeGroups = (list, ageGroup) => {
    let currentOnArtMale = 0;
    let currentOnArtFemale = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
            let index = ageGroup.indexOf(list[i].ageGroup);
            if(index === -1) {
                continue;
            }
            currentOnArtMale = currentOnArtMale + parseInt(list[i].txCurr, 10);
        } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
            let index = ageGroup.indexOf(list[i].ageGroup);
            if(index === -1) {
                continue;
            }
            currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txCurr, 10);
        }
    }
    return currentOnArtMale + currentOnArtFemale;
}
