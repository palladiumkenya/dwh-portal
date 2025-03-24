import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.htsPosByGenderKHIS.listUnfiltered;
const listFiltered = (state) => state.htsPosByGenderKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = (state) => state.htsPosByAgeDWH.listUnfiltered;
const listFilteredDWH = (state) => state.htsPosByAgeDWH.listFiltered;

const listUnfilteredDWHGender = (state) => state.htsPosByGenderDWH.listUnfiltered;
const listFilteredDWHGender = (state) => state.htsPosByGenderDWH.listFiltered;

let datimAgeGroups = (state) => state.filters.datimAgeGroups;

export const getHTSPOSKHIS = createSelector(
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
        let totalPositive = 0;
        let malesPositive = 0;
        let femalesPositive = 0;
        let adultsPositive = 0;
        let childrenPositive = 0;
        let adolescentsPositive = 0;
        let htsPosByAge = [0, 0, 0, 0, 0, 0];

        if (filtered && datimAgeGroups.length > 0) {
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
                    totalPositive +=
                        list.Positive_10_14_M + list.Positive_10_14_F;
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
                    totalPositive +=
                        list.Positive_15_19_F + list.Positive_15_19_M;
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
                    totalPositive +=
                        list.Positive_20_24_F + list.Positive_20_24_M;
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
            malesPositive = list.Positive_Male;
            femalesPositive = list.Positive_Female;
            adultsPositive = list.adults;
            childrenPositive = list.children;
            adolescentsPositive = list.adolescent;

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
        let htsPosByAgeDWH = [0, 0, 0, 0, 0, 0];

        // if (filtered && datimAgeGroups.length>0) {
        //     for (let i = 0; i < datimAgeGroups.length; i++) {
        //         if (datimAgeGroups[i] === 'Under 1') {
        //             htsPosByAgeDWH.splice(0, 1, loopAgeGroups(listDWH, under1));}
        //         if (datimAgeGroups[i] === '1 to 9') {
        //             htsPosByAgeDWH.splice(
        //                 1,
        //                 1,
        //                 loopAgeGroups(listDWH, oneToNine)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '10 to 14') {
        //             htsPosByAgeDWH.splice(
        //                 2,
        //                 1,
        //                 loopAgeGroups(listDWH, tenToFourteen)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '15 to 19') {
        //             htsPosByAgeDWH.splice(
        //                 3,
        //                 1,
        //                 loopAgeGroups(listDWH, fifteenToNineteen)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '20 to 24') {
        //             htsPosByAgeDWH.splice(
        //                 4,
        //                 1,
        //                 loopAgeGroups(listDWH, twentyToTwentyFour)
        //             );
        //         }
        //         if (datimAgeGroups[i] === '25+') {
        //             htsPosByAgeDWH.splice(
        //                 5,
        //                 1,
        //                 loopAgeGroups(listDWH, twentyFivePlus)
        //             );
        //         }
        //     }
        // } else
        htsPosByAgeDWH = [
            loopAgeGroups(listDWH, under1),
            loopAgeGroups(listDWH, oneToNine),
            loopAgeGroups(listDWH, tenToFourteen),
            loopAgeGroups(listDWH, fifteenToNineteen),
            loopAgeGroups(listDWH, twentyToTwentyFour),
            loopAgeGroups(listDWH, twentyFivePlus),
        ];

        let genderDWH= {
            male: 0, female: 0
        }
        if (listDWHGender.length) {
            genderDWH = {
                male: parseInt(listDWHGender.find(e => e.Gender === 'MALE')?.positive ?? 0),
                female: parseInt(listDWHGender.find(e => e.Gender === 'FEMALE')?.positive ?? 0)
            };
        }

        return {
            totalPositive,
            malesPositive,
            femalesPositive,
            adultsPositive,
            childrenPositive,
            adolescentsPositive,
            htsPosByAge,
            htsPosByAgeDWH,
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
            hts = hts + parseInt(list[i].positive, 10);

    }
    return hts;
}
