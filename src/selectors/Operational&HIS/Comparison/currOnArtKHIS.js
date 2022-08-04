import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.currOnArtKHIS.listUnfiltered;
const listFiltered = state => state.currOnArtKHIS.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFilteredDWH = state => state.currentOnArtByAgeSex.listFiltered;

let datimAgeGroups = (state) => state.filters.datimAgeGroups;

export const getCurrOnArtKHIS = createSelector(
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

        //KHIS
        let totalOnART = 0
        let malesOnART = 0
        let femalesOnART = 0
        let adultsOnART = 0
        let childrenOnART = 0
        let adolescentsOnART = 0
        let OnARTByAge = [0,0,0,0,0,0]


        if (filtered && datimAgeGroups.length>0) {
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    totalOnART += list.On_ART_Under_1;
                    childrenOnART += list.On_ART_Under_1;
                    OnARTByAge.splice(0,1,list.On_ART_Under_1 || 0);
                }
                if (datimAgeGroups[i] === '1 to 9') {
                    totalOnART += list.On_ART_1_9;
                    childrenOnART += list.On_ART_1_9;
                    OnARTByAge.splice(1,1,list.On_ART_1_9 || 0);
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    totalOnART += list.On_ART_10_14_F + list.On_ART_10_14_M;
                    malesOnART += list.On_ART_10_14_M;
                    femalesOnART += list.On_ART_10_14_F;
                    childrenOnART += list.On_ART_10_14_F + list.On_ART_10_14_M;
                    adolescentsOnART += list.On_ART_10_14_F + list.On_ART_10_14_M;
                    OnARTByAge.splice(2,1,
                        (list.On_ART_10_14_M || 0) + (list.On_ART_10_14_F || 0)
                    );
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    totalOnART += list.On_ART_15_19_F + list.On_ART_15_19_M;
                    malesOnART += list.On_ART_15_19_M;
                    femalesOnART += list.On_ART_15_19_F;
                    adolescentsOnART += list.On_ART_15_19_F + list.On_ART_15_19_M;
                    adultsOnART += list.On_ART_15_19_F + list.On_ART_15_19_M;
                    OnARTByAge.splice(3,1,
                        (list.On_ART_15_19_M || 0) + (list.On_ART_15_19_F || 0)
                    )
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    totalOnART += list.On_ART_20_24_F + list.On_ART_20_24_M;
                    malesOnART += list.On_ART_20_24_M;
                    femalesOnART += list.On_ART_20_24_F;
                    adultsOnART += list.On_ART_20_24_F + list.On_ART_20_24_M;
                    OnARTByAge.splice(4, 1,
                        (list.On_ART_20_24_F || 0) + (list.On_ART_20_24_M || 0)
                    )
                }
                if (datimAgeGroups[i] === '25+') {
                    totalOnART += list.On_ART_25_Plus_F + list.On_ART_25_Plus_M;
                    malesOnART += list.On_ART_25_Plus_M;
                    femalesOnART += list.On_ART_25_Plus_F;
                    adultsOnART += list.On_ART_25_Plus_F + list.On_ART_25_Plus_M;
                    OnARTByAge.splice(5,1,
                        (list.On_ART_25_Plus_M || 0) + (list.On_ART_25_Plus_F || 0)
                    )
                }
            }
        } else {
            totalOnART = list.CurrentOnART_Total;
            malesOnART =
                list.On_ART_25_Plus_M +
                list.On_ART_20_24_M +
                list.On_ART_15_19_M +
                list.On_ART_10_14_M;
            femalesOnART =
                list.On_ART_25_Plus_F +
                list.On_ART_20_24_F +
                list.On_ART_15_19_F +
                list.On_ART_10_14_F;
            adultsOnART =
                list.On_ART_15_19_F +
                list.On_ART_15_19_M +
                list.On_ART_20_24_F +
                list.On_ART_20_24_M +
                list.On_ART_25_Plus_F +
                list.On_ART_25_Plus_M;
            childrenOnART =
                list.On_ART_10_14_F +
                list.On_ART_10_14_M +
                list.On_ART_1_9 +
                list.On_ART_Under_1;
            adolescentsOnART =
                list.On_ART_10_14_F +
                list.On_ART_10_14_M +
                list.On_ART_15_19_M +
                list.On_ART_15_19_F;

            OnARTByAge = [
                list.On_ART_Under_1 || 0,
                list.On_ART_1_9 || 0,
                (list.On_ART_10_14_M || 0) + (list.On_ART_10_14_F || 0),
                (list.On_ART_15_19_M || 0) + (list.On_ART_15_19_F || 0),
                (list.On_ART_20_24_M || 0) + (list.On_ART_20_24_F || 0),
                (list.On_ART_25_Plus_M || 0) + (list.On_ART_25_Plus_F || 0),
            ];
        }

        //DWH
        let under1 = ['<1'];
        let oneToNine = ['1-4', '5-9'];
        let tenToFourteen = ['10-14'];
        let fifteenToNineteen = ['15-19'];
        let twentyToTwentyFour = ['20-24'];
        let twentyFivePlus = [
            '25-29',
            '30-34',
            '35-39',
            '40-44',
            '45-49',
            '50-54',
            '55-59',
            '60-64',
            '65+',
        ];
        let OnARTByAgeDWH = [0, 0, 0, 0, 0, 0];
        
        if (filtered && datimAgeGroups.length>0) {
            for (let i = 0; i < datimAgeGroups.length; i++) {
                if (datimAgeGroups[i] === 'Under 1') {
                    OnARTByAgeDWH.splice(0, 1, loopAgeGroups(listDWH, under1));}
                if (datimAgeGroups[i] === '1 to 9') {
                    OnARTByAgeDWH.splice(
                        1,
                        1,
                        loopAgeGroups(listDWH, oneToNine)
                    );
                    console.log(listDWH);
                }
                if (datimAgeGroups[i] === '10 to 14') {
                    OnARTByAgeDWH.splice(
                        2,
                        1,
                        loopAgeGroups(listDWH, fifteenToNineteen)
                    );
                }
                if (datimAgeGroups[i] === '15 to 19') {
                    OnARTByAgeDWH.splice(
                        3,
                        1,
                        loopAgeGroups(listDWH, fifteenToNineteen)
                    );
                }
                if (datimAgeGroups[i] === '20 to 24') {
                    OnARTByAgeDWH.splice(
                        4,
                        1,
                        loopAgeGroups(listDWH, twentyToTwentyFour)
                    );
                }
                if (datimAgeGroups[i] === '25+') {
                    OnARTByAgeDWH.splice(
                        5,
                        1,
                        loopAgeGroups(listDWH, twentyFivePlus)
                    );
                }
            }
        } else 
            OnARTByAgeDWH = [
                loopAgeGroups(listDWH, under1),
                loopAgeGroups(listDWH, oneToNine),
                loopAgeGroups(listDWH, tenToFourteen),
                loopAgeGroups(listDWH, fifteenToNineteen),
                loopAgeGroups(listDWH, twentyToTwentyFour),
                loopAgeGroups(listDWH, twentyFivePlus),
            ];

        return {
            totalOnART,
            malesOnART,
            femalesOnART,
            adultsOnART,
            childrenOnART,
            adolescentsOnART,
            OnARTByAge,
            OnARTByAgeDWH,
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
