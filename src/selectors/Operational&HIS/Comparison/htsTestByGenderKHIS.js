import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = (state) => state.htsTestByGenderKHIS.listUnfiltered;
const listFiltered = (state) => state.htsTestByGenderKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = (state) => state.htsPosByAgeDWH.listUnfiltered;
const listFilteredDWH = (state) => state.htsPosByAgeDWH.listFiltered;

const listUnfilteredDWHGender = (state) => state.htsPosByGenderDWH.listUnfiltered;
const listFilteredDWHGender = (state) => state.htsPosByGenderDWH.listFiltered;

let datimAgeGroups = (state) => state.filters.datimAgeGroups;

export const getHTSTESTKHIS = createSelector(
    [
        listUnfiltered,
        listFiltered,
        listUnfilteredDWH,
        listFilteredDWH,
        listUnfilteredDWHGender,
        listFilteredDWHGender,
        filtered,
        datimAgeGroups,
    ],
    (
        listUnfiltered,
        listFiltered,
        listUnfilteredDWH,
        listFilteredDWH,
        listUnfilteredDWHGender,
        listFilteredDWHGender,
        filtered,
        datimAgeGroups
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;
        const listDWHGender = filtered ? listFilteredDWHGender : listUnfilteredDWHGender;

        //KHIS
        let totalTested = 0;
        let malesTested = 0;
        let femalesTested = 0;
        let adultsTested = 0;
        let childrenTested = 0;
        let adolescentsTested = 0;
        let htsTestByAge = [0, 0, 0, 0, 0, 0];

        if (filtered && datimAgeGroups.length > 0) {
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    totalTested += 0;
                    childrenTested += 0;
                    htsTestByAge.splice(0, 1, 0 || 0);
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    totalTested += list.Tested_1_9;
                    childrenTested += list.Tested_1_9;
                    htsTestByAge.splice(1, 1, list.Tested_1_9 || 0);
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    totalTested +=
                        list.Tested_10_14_M + list.Tested_10_14_F;
                    malesTested += list.Tested_10_14_M;
                    femalesTested += list.Tested_10_14_F;
                    childrenTested +=
                        list.Tested_10_14_M + list.Tested_10_14_F;
                    adolescentsTested +=
                        list.Tested_10_14_M + list.Tested_10_14_F;
                    htsTestByAge.splice(
                        2,
                        1,
                        (list.Tested_10_14_M || 0) +
                            (list.Tested_10_14_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    totalTested +=
                        list.Tested_15_19_F + list.Tested_15_19_M;
                    malesTested += list.Tested_15_19_M;
                    femalesTested += list.Tested_15_19_F;
                    adolescentsTested +=
                        list.Tested_15_19_F + list.Tested_15_19_M;
                    adultsTested +=
                        list.Tested_15_19_F + list.Tested_15_19_M;
                    htsTestByAge.splice(
                        3,
                        1,
                        (list.Tested_15_19_M || 0) +
                            (list.Tested_15_19_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    totalTested +=
                        list.Tested_20_24_F + list.Tested_20_24_M;
                    malesTested += list.Tested_20_24_M;
                    femalesTested += list.Tested_20_24_F;
                    adultsTested +=
                        list.Tested_20_24_F + list.Tested_20_24_M;
                    htsTestByAge.splice(
                        4,
                        1,
                        (list.Tested_20_24_F || 0) +
                            (list.Tested_20_24_M || 0)
                    );
                }
                if (datimAgeGroups[i] === '25+') {
                    totalTested +=
                        list.Tested_25_Plus_F + list.Tested_25_Plus_M;
                    malesTested += list.Tested_25_Plus_M;
                    femalesTested += list.Tested_25_Plus_F;
                    adultsTested +=
                        list.Tested_25_Plus_F + list.Tested_25_Plus_M;
                    htsTestByAge.splice(
                        5,
                        1,
                        (list.Tested_25_Plus_M || 0) +
                            (list.Tested_25_Plus_F || 0)
                    );
                }
            }
        } else {
            totalTested = list.Tested_Total;
            malesTested = list.Tested_Male;
            femalesTested = list.Tested_Female;
            adultsTested = list.adults;
            childrenTested = list.children;
            adolescentsTested = list.adolescent;

            htsTestByAge = [
                0,
                list.Tested_1_9 || 0,
                (list.Tested_10_14_M || 0) + (list.Tested_10_14_F || 0),
                (list.Tested_15_19_M || 0) + (list.Tested_15_19_F || 0),
                (list.Tested_20_24_M || 0) + (list.Tested_20_24_F || 0),
                (list.Tested_25_Plus_M || 0) + (list.Tested_25_Plus_F || 0),
            ];
        }

        //DWH
        let under1 = [];
        let oneToNine = ['Under 5', '5 to 9'];
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
        let htsTestByAgeDWH = [0, 0, 0, 0, 0, 0];

        // if (filtered && datimAgeGroups.length>0) {
        //     for (let i = 0; i < datimAgeGroups.length; i++) {
        //         if (datimAgeGroups[i] === 'Under 1') {
        //             htsTestByAgeDWH.splice(0, 1, loopAgeGroups(listDWH, under1));}
        //         if (datimAgeGroups[i] === '1 to 9') {
        //             htsTestByAgeDWH.splice(
        //                 1,
        //                 1,
        //                 loopAgeGroups(listDWH, oneToNine)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '10 to 14') {
        //             htsTestByAgeDWH.splice(
        //                 2,
        //                 1,
        //                 loopAgeGroups(listDWH, tenToFourteen)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '15 to 19') {
        //             htsTestByAgeDWH.splice(
        //                 3,
        //                 1,
        //                 loopAgeGroups(listDWH, fifteenToNineteen)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '20 to 24') {
        //             htsTestByAgeDWH.splice(
        //                 4,
        //                 1,
        //                 loopAgeGroups(listDWH, twentyToTwentyFour)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '25+') {
        //             htsTestByAgeDWH.splice(
        //                 5,
        //                 1,
        //                 loopAgeGroups(listDWH, twentyFivePlus)
        //             );
        //         }
        //     }
        // } else
        htsTestByAgeDWH = [
            loopAgeGroups(listDWH, under1),
            loopAgeGroups(listDWH, oneToNine),
            loopAgeGroups(listDWH, tenToFourteen),
            loopAgeGroups(listDWH, fifteenToNineteen),
            loopAgeGroups(listDWH, twentyToTwentyFour),
            loopAgeGroups(listDWH, twentyFivePlus),
        ];
        
        let genderDWH = {
            male : parseInt(listDWHGender.find(e => e.Gender === "MALE")?.tested ?? 0),
            female : parseInt(listDWHGender.find(e => e.Gender === "FEMALE")?.tested ?? 0)
        }

        return {
            totalTested,
            malesTested,
            femalesTested,
            adultsTested,
            childrenTested,
            adolescentsTested,
            htsTestByAge,
            htsTestByAgeDWH,
            genderDWH,
        };
    }
);

const loopAgeGroups = (list, ageGroup) => {
    let hts = 0;

    for (let i = 0; i < list.length; i++) {
        
            let index = ageGroup.indexOf(list[i].ageGroup);
            if(index === -1) {
                continue;
            }
            hts = hts + parseInt(list[i].tested, 10);
        
    }
    return hts;
}
