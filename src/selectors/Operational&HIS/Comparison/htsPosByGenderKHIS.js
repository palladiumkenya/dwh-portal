import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = (state) => state.htsPosByGenderKHIS.listUnfiltered;
const listFiltered = (state) => state.htsPosByGenderKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFilteredDWH = state => state.currentOnArtByAgeSex.listFiltered;

let datimAgeGroups = (state) => state.filters.datimAgeGroups;

export const getHTSPOSKHIS = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
        datimAgeGroups,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered,
        datimAgeGroups
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;

        //KHIS
        let totalPositive = 0
        let malesPositive = 0
        let femalesPositive = 0
        let adultsPositive = 0
        let childrenPositive = 0
        let adolescentsPositive = 0
        let htsPosByAge = [0, 0, 0, 0, 0, 0];


        if (filtered && datimAgeGroups.length>0) {
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    totalPositive += 0;
                    childrenPositive += 0;
                    htsPosByAge.splice(0, 1, 0 || 0);
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    totalPositive += list.Positive_1_9;
                    childrenPositive += list.Positive_1_9;
                    htsPosByAge.splice(1, 1, list.Positive_1_9 || 0);
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    totalPositive += list.Positive_10_14_M + list.Positive_10_14_F;
                    malesPositive += list.Positive_10_14_M;
                    femalesPositive += list.Positive_10_14_F;
                    childrenPositive +=
                        list.Positive_10_14_M + list.Positive_10_14_F;
                    adolescentsPositive +=
                        list.Positive_10_14_M + list.Positive_10_14_F;
                    htsPosByAge.splice(
                        2,
                        1,
                        (list.Positive_10_14_M || 0) +
                            (list.Positive_10_14_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    totalPositive += list.Positive_15_19_F + list.Positive_15_19_M;
                    malesPositive += list.Positive_15_19_M;
                    femalesPositive += list.Positive_15_19_F;
                    adolescentsPositive +=
                        list.Positive_15_19_F + list.Positive_15_19_M;
                    adultsPositive +=
                        list.Positive_15_19_F + list.Positive_15_19_M;
                    htsPosByAge.splice(
                        3,
                        1,
                        (list.Positive_15_19_M || 0) +
                            (list.Positive_15_19_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    totalPositive += list.Positive_20_24_F + list.Positive_20_24_M;
                    malesPositive += list.Positive_20_24_M;
                    femalesPositive += list.Positive_20_24_F;
                    adultsPositive +=
                        list.Positive_20_24_F + list.Positive_20_24_M;
                    htsPosByAge.splice(
                        4,
                        1,
                        (list.Positive_20_24_F || 0) +
                            (list.Positive_20_24_M || 0)
                    );
                }
                if (datimAgeGroups[i] === '25+') {
                    totalPositive +=
                        list.Positive_25_Plus_F + list.Positive_25_Plus_M;
                    malesPositive += list.Positive_25_Plus_M;
                    femalesPositive += list.Positive_25_Plus_F;
                    adultsPositive +=
                        list.Positive_25_Plus_F + list.Positive_25_Plus_M;
                    htsPosByAge.splice(
                        5,
                        1,
                        (list.Positive_25_Plus_M || 0) +
                            (list.Positive_25_Plus_F || 0)
                    );
                }
            }
        } else {
            totalPositive = list.Positive_Total;
            malesPositive =
                list.Positive_Male
            femalesPositive =
                list.Positive_Female
            adultsPositive =
                list.adults
            childrenPositive = list.children;
            adolescentsPositive =
                list.adolescent

            htsPosByAge = [
                0,
                list.Positive_1_9 || 0,
                (list.Positive_10_14_M || 0) + (list.Positive_10_14_F || 0),
                (list.Positive_15_19_M || 0) + (list.Positive_15_19_F || 0),
                (list.Positive_20_24_M || 0) + (list.Positive_20_24_F || 0),
                (list.Positive_25_Plus_M || 0) + (list.Positive_25_Plus_F || 0),
            ];
        }

        //DWH
        // let under1 = ['<1'];
        // let oneToNine = ['1-4', '5-9'];
        // let tenToFourteen = ['10-14'];
        // let fifteenToNineteen = ['15-19'];
        // let twentyToTwentyFour = ['20-24'];
        // let twentyFivePlus = [
        //     '25-29',
        //     '30-34',
        //     '35-39',
        //     '40-44',
        //     '45-49',
        //     '50-54',
        //     '55-59',
        //     '60-64',
        //     '65+',
        // ];
        let htsPosByAgeDWH = [0, 0, 0, 0, 0, 0];
        
        // if (filtered && datimAgeGroups.length>0) {
        //     for (let i = 0; i < datimAgeGroups.length; i++) {
        //         if (datimAgeGroups[i] === 'Under 1') {
        //             OnARTByAgeDWH.splice(0, 1, loopAgeGroups(listDWH, under1));}
        //         if (datimAgeGroups[i] === '1 to 9') {
        //             OnARTByAgeDWH.splice(
        //                 1,
        //                 1,
        //                 loopAgeGroups(listDWH, oneToNine)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '10 to 14') {
        //             OnARTByAgeDWH.splice(
        //                 2,
        //                 1,
        //                 loopAgeGroups(listDWH, tenToFourteen)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '15 to 19') {
        //             OnARTByAgeDWH.splice(
        //                 3,
        //                 1,
        //                 loopAgeGroups(listDWH, fifteenToNineteen)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '20 to 24') {
        //             OnARTByAgeDWH.splice(
        //                 4,
        //                 1,
        //                 loopAgeGroups(listDWH, twentyToTwentyFour)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '25+') {
        //             OnARTByAgeDWH.splice(
        //                 5,
        //                 1,
        //                 loopAgeGroups(listDWH, twentyFivePlus)
        //             );
        //         }
        //     }
        // } else 
        //     OnARTByAgeDWH = [
        //         loopAgeGroups(listDWH, under1),
        //         loopAgeGroups(listDWH, oneToNine),
        //         loopAgeGroups(listDWH, tenToFourteen),
        //         loopAgeGroups(listDWH, fifteenToNineteen),
        //         loopAgeGroups(listDWH, twentyToTwentyFour),
        //         loopAgeGroups(listDWH, twentyFivePlus),
        //     ];

        return {
            totalPositive,
            malesPositive,
            femalesPositive,
            adultsPositive,
            childrenPositive,
            adolescentsPositive,
            htsPosByAge,
            htsPosByAgeDWH

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
