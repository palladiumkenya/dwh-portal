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

let datimAgeGroups = (state) => state.filters.datimAgeGroups;

export const getNewlyStartedOnArtKHIS = createSelector(
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

        let totalNewlyStarted = 0;
        let malesNewlyStarted = 0;
        let femalesNewlyStarted = 0;
        let adultsNewlyStarted = 0;
        let childrenNewlyStarted = 0;
        let adolescentsNewlyStarted = 0;

        let newlyStartedByAge = [0, 0, 0, 0, 0, 0];

        if (filtered && datimAgeGroups.length>0) {
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    totalNewlyStarted += list.Start_ART_Under_1;
                    childrenNewlyStarted += list.Start_ART_Under_1;
                    newlyStartedByAge.splice(0, 1, list.Start_ART_Under_1 || 0);
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    totalNewlyStarted += list.Start_ART_1_9;
                    childrenNewlyStarted += list.Start_ART_1_9;
                    newlyStartedByAge.splice(1, 1, list.Start_ART_1_9 || 0);
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    totalNewlyStarted +=
                        list.Start_ART_10_14_F + list.Start_ART_10_14_M;
                    malesNewlyStarted += list.Start_ART_10_14_M;
                    femalesNewlyStarted += list.Start_ART_10_14_F;
                    childrenNewlyStarted +=
                        list.Start_ART_10_14_F + list.Start_ART_10_14_M;
                    adolescentsNewlyStarted +=
                        list.Start_ART_10_14_F + list.Start_ART_10_14_M;
                    newlyStartedByAge.splice(
                        2,
                        1,
                        (list.Start_ART_10_14_M || 0) +
                            (list.Start_ART_10_14_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    totalNewlyStarted +=
                        list.Start_ART_15_19_F + list.Start_ART_15_19_M;
                    malesNewlyStarted += list.Start_ART_15_19_M;
                    femalesNewlyStarted += list.Start_ART_15_19_F;
                    adolescentsNewlyStarted +=
                        list.Start_ART_15_19_F + list.Start_ART_15_19_M;
                    adultsNewlyStarted +=
                        list.Start_ART_15_19_F + list.Start_ART_15_19_M;
                    newlyStartedByAge.splice(
                        3,
                        1,
                        (list.Start_ART_15_19_M || 0) +
                            (list.Start_ART_15_19_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    totalNewlyStarted +=
                        list.Start_ART_20_24_F + list.Start_ART_20_24_M;
                    malesNewlyStarted += list.Start_ART_20_24_M;
                    femalesNewlyStarted += list.Start_ART_20_24_F;
                    adultsNewlyStarted +=
                        list.Start_ART_20_24_F + list.Start_ART_20_24_M;
                    newlyStartedByAge.splice(
                        4,
                        1,
                        (list.Start_ART_20_24_F || 0) +
                            (list.Start_ART_20_24_M || 0)
                    );
                }
                if (datimAgeGroups[i] === '25+') {
                    totalNewlyStarted +=
                        list.Start_ART_25_Plus_F + list.Start_ART_25_Plus_M;
                    malesNewlyStarted += list.Start_ART_25_Plus_M;
                    femalesNewlyStarted += list.Start_ART_25_Plus_F;
                    adultsNewlyStarted +=
                        list.Start_ART_25_Plus_F + list.Start_ART_25_Plus_M;
                    newlyStartedByAge.splice(
                        5,
                        1,
                        (list.Start_ART_25_Plus_M || 0) +
                            (list.Start_ART_25_Plus_F || 0)
                    );
                }
            }
        } else {
            totalNewlyStarted = list.StartedART_Total;
            malesNewlyStarted =
                list.Start_ART_25_Plus_M +
                list.Start_ART_20_24_M +
                list.Start_ART_15_19_M +
                list.Start_ART_10_14_M;
            femalesNewlyStarted =
                list.Start_ART_25_Plus_F +
                list.Start_ART_20_24_F +
                list.Start_ART_15_19_F +
                list.Start_ART_10_14_F;
            adultsNewlyStarted =
                list.Start_ART_15_19_F +
                list.Start_ART_15_19_M +
                list.Start_ART_20_24_F +
                list.Start_ART_20_24_M +
                list.Start_ART_25_Plus_F +
                list.Start_ART_25_Plus_M;
            childrenNewlyStarted =
                list.Start_ART_10_14_F +
                list.Start_ART_10_14_M +
                list.Start_ART_1_9 +
                list.Start_ART_Under_1;
            adolescentsNewlyStarted =
                list.Start_ART_10_14_F +
                list.Start_ART_10_14_M +
                list.Start_ART_15_19_M +
                list.Start_ART_15_19_F;

            newlyStartedByAge = [
                list.Start_ART_Under_1 || 0,
                list.Start_ART_1_9 || 0,
                (list.Start_ART_10_14_M || 0) + (list.Start_ART_10_14_F || 0),
                (list.Start_ART_15_19_M || 0) + (list.Start_ART_15_19_F || 0),
                (list.Start_ART_20_24_M || 0) + (list.Start_ART_20_24_F || 0),
                (list.Start_ART_25_Plus_M || 0) +
                    (list.Start_ART_25_Plus_F || 0),
            ];
        }

        //DWH
        let under1 = ['Under 1'];
        let oneToNine = ['1 to 4', '5 to 9'];
        let tenToFourteen = ['10 to 14'];
        let fifteenToNineteen = ['15 to 19'];
        let twentyToTwentyFour = ['20 to 24'];
        let twentyFivePlus = [
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+',
        ];

        let newOnARTByAgeDWH = [
            loopAgeGroups(listDWH, under1),
            loopAgeGroups(listDWH, oneToNine),
            loopAgeGroups(listDWH, tenToFourteen),
            loopAgeGroups(listDWH, fifteenToNineteen),
            loopAgeGroups(listDWH, twentyToTwentyFour),
            loopAgeGroups(listDWH, twentyFivePlus),
        ];

        return {
            totalNewlyStarted,
            malesNewlyStarted,
            femalesNewlyStarted,
            adultsNewlyStarted,
            childrenNewlyStarted,
            adolescentsNewlyStarted,
            newlyStartedByAge,
            newOnARTByAgeDWH,
        };
    }
);

export const getNewlyStartedOnArtTrendsKHIS = createSelector(
    [listUnfilteredTrends, listFilteredTrends, filteredTrends, datimAgeGroups],
    (listUnfiltered, listFiltered, filtered, datimAgeGroups) => {
        let list = filtered ? listFiltered : listUnfiltered;

        let ReportingMonthYear = moment()
            .subtract(1, 'months')
            .add(15, 'days')
            .format('YMM');

        if (list.length >= 12) {
            list = list.filter((item) => {
                if (item.ReportMonth_Year < ReportingMonthYear) {
                    return item;
                }
            });
            list.length = 12;
        }

        const labels = list
            .map((item) => {
                return moment(item.ReportMonth_Year)
                    .format('MMM YYYY')
                    .toUpperCase();
            })
            .reverse();
        
        let data = [];
        if (filtered && datimAgeGroups.length>0) {
            list.map((item) => (item.StartART1 = 0));
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    list.map((item) => {
                        item.StartART1 += item.Start_ART_Under_1;
                    });
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    list.map((item) => {
                        item.StartART1 += item.Start_ART_1_9;
                    });
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    list.map((item) => {
                        item.StartART1 += item.Start_ART_10_14;
                    });
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    list.map((item) => {
                        item.StartART1 += item.Start_ART_15_19;
                    });
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    list.map((item) => {
                        item.StartART1 += item.Start_ART_20_24;
                        console.log(item);
                    });
                }
                if (datimAgeGroups[i] === '25+') {
                    list.map((item) => {
                        item.StartART1 += item.Start_ART_25_Plus;
                    });
                }
            }
            data = list.map((item) => item.StartART1).reverse();
        } else data = list.map((item) => item.StartedART_Total).reverse();

        return {
            data,
            labels,
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
