import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.newlyStartedOnArtKHIS.listUnfiltered;
const listFiltered = state => state.newlyStartedOnArtKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.newOnArtByAgeSex.listUnfiltered;
const listFilteredDWH = state => state.newOnArtByAgeSex.listFiltered;

const listUnfilteredTrends = state => state.newlyStartedOnArtTrendsKHIS.listUnfiltered;
const listFilteredTrends = state => state.newlyStartedOnArtTrendsKHIS.listFiltered;
const filteredTrends = state => state.filters.filtered;


export const getNewlyStartedOnArtKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH],
    (listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

        const totalNewlyStarted = list.StartedART_Total;
        const malesNewlyStarted = list.Start_ART_25_Plus_M + list.Start_ART_20_24_M + list.Start_ART_15_19_M + list.Start_ART_10_14_M;
        const femalesNewlyStarted = list.Start_ART_25_Plus_F + list.Start_ART_20_24_F + list.Start_ART_15_19_F + list.Start_ART_10_14_F;
        const adultsNewlyStarted = list.Start_ART_15_19_F + list.Start_ART_15_19_M + list.Start_ART_20_24_F + list.Start_ART_20_24_M + list.Start_ART_25_Plus_F + list.Start_ART_25_Plus_M;
        const childrenNewlyStarted = list.Start_ART_10_14_F + list.Start_ART_10_14_M + list.Start_ART_1_9 + list.Start_ART_Under_1;
        const adolescentsNewlyStarted = list.Start_ART_10_14_F + list.Start_ART_10_14_M + list.Start_ART_15_19_M + list.Start_ART_15_19_F;

        const newlyStartedByAge = [
            list.Start_ART_Under_1||0,
            list.Start_ART_1_9||0,
            (list.Start_ART_10_14_M || 0) + (list.Start_ART_10_14_F || 0),
            (list.Start_ART_15_19_M || 0) + (list.Start_ART_15_19_F || 0),
            (list.Start_ART_20_24_M ||0) + (list.Start_ART_20_24_F || 0),
            (list.Start_ART_25_Plus_M || 0) + (list.Start_ART_25_Plus_F || 0)
        ];

        //DWH
        let under1 = ['Under 1'];
        let oneToNine = ['1 to 4', '5 to 9'];
        let tenToFourteen = ["10 to 14"]
        let fifteenToNineteen = ["15 to 19"]
        let twentyToTwentyFour = ["20 to 24"]
        let twentyFivePlus = ["25 to 29", "30 to 34", "35 to 39", "40 to 44", "45 to 49", "50 to 54", "55 to 59", "60 to 64", "65+"];


        let newOnARTByAgeDWH = [loopAgeGroups(listDWH, under1), loopAgeGroups(listDWH, oneToNine), loopAgeGroups(listDWH, tenToFourteen), loopAgeGroups(listDWH, fifteenToNineteen), loopAgeGroups(listDWH, twentyToTwentyFour), loopAgeGroups(listDWH, twentyFivePlus)];

        return {
            totalNewlyStarted,
            malesNewlyStarted,
            femalesNewlyStarted,
            adultsNewlyStarted,
            childrenNewlyStarted,
            adolescentsNewlyStarted,
            newlyStartedByAge,
            newOnARTByAgeDWH
        };
    }
);

export const getNewlyStartedOnArtTrendsKHIS = createSelector(
    [listUnfilteredTrends, listFilteredTrends, filteredTrends],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        if (list.length >= 12)
            list.length = 12;

        const labels = list.map((item) => {
            return moment( item.ReportMonth_Year ).format('MMM YYYY').toUpperCase();
        }).reverse();
        const data = list.map(item => item.StartedART_Total).reverse();

        return {
            data, labels
        };
    }
);

const loopAgeGroups = (list, ageGroup) => {
    let currentOnArtMale = 0;
    let currentOnArtFemale = 0;


    for (let i = 0; i < list.length; i++) {
        if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
            let index = ageGroup.indexOf(list[i].AgeGroup);
            if(index === -1) {
                continue;
            }
            currentOnArtMale = currentOnArtMale + parseInt(list[i].txNew, 10);
        } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
            let index = ageGroup.indexOf(list[i].AgeGroup);
            if(index === -1) {
                continue;
            }
            currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txNew, 10);
        }
    }
    return currentOnArtMale + currentOnArtFemale;
}
