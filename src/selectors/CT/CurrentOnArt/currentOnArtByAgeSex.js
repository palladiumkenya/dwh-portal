import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtByAgeSex.listUnfiltered;
const listFiltered = state => state.currentOnArtByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            ' Under 1',
            '01 to 04',
            '05 to 09',
            '10 to 14',
            '10 to 19',
            '20 to 24',
            '20 to 29',
            '30 to 34',
            '30 to 39',
            '40 to 44',
            '40 to 49',
            '50 to 54',
            '50 to 59',
            '60 to 64',
            '65+',
        ];
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.ageGroup === ageGroup &&
                    (obj?.Gender?.toLowerCase() === 'M'.toLowerCase() ||
                        obj?.Gender?.toLowerCase() === 'Male'.toLowerCase())
            );
            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj?.ageGroup === ageGroup &&
                    (obj?.Gender?.toLowerCase() === 'F'.toLowerCase() ||
                        obj?.Gender?.toLowerCase() === 'Female'.toLowerCase())
            );
            if (ageGroupMaleFilter.length > 0) {
                currentOnArtMale.push(ageGroupMaleFilter[0].txCurr);
            } else {
                currentOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                currentOnArtFemale.push(ageGroupFemaleFilter[0].txCurr);
            } else {
                currentOnArtFemale.push(0);
            }
        }

        // for (let i = 0; i < list.length; i++) {
        //     if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
        //         let index = ageGroups.indexOf(list[i].ageGroup);
        //         currentOnArtMale.splice(index, 0, parseInt(list[i].txCurr));
        //     } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
        //         let index = ageGroups.indexOf(list[i].ageGroup);
        //         currentOnArtFemale.splice(index, 0, parseInt(list[i].txCurr));
        //     }
        // }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);
        currentOnArtMale = currentOnArtMale.map(x => x * -1);

        return { ageGroups, max, currentOnArtFemale, currentOnArtMale };
    }
);

export const getCurrentOnArtBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let currentOnArtMale = 0;
        let currentOnArtFemale = 0;

        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender?.toLowerCase() === "M".toLowerCase() || list[i].Gender?.toLowerCase() === "Male".toLowerCase()) {
                currentOnArtMale = currentOnArtMale + parseInt(list[i].txCurr);
            } else if (list[i].Gender?.toLowerCase() === "F".toLowerCase() || list[i].Gender?.toLowerCase() === "Female".toLowerCase()) {
                currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txCurr);
            }
        }

        return { currentOnArtFemale, currentOnArtMale };
    }
);

export const getCurrentOnArtByAgeSexList = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getCurrentOnArtAdults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            // "< 1",
            // "1-4",
            // "5-9",
            // "10-14",
            "15 to 19",
            "20 to 24",
            "25 to 29",
            "30 to 34",
            "35 to 39",
            "40 to 44",
            "45 to 49",
            "50 to 54",
            "55 to 59",
            "60 to 64",
            "65+"
        ];
        let currentOnArtMale = 0;
        let currentOnArtFemale = 0;

        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender?.toLowerCase() === "M".toLowerCase() || list[i].Gender?.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                if(index === -1) {
                    continue;
                }
                currentOnArtMale = currentOnArtMale + parseInt(list[i].txCurr, 10);
            } else if (list[i].Gender?.toLowerCase() === "F".toLowerCase() || list[i].Gender?.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                if(index === -1) {
                    continue;
                }
                currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txCurr, 10);
            }
        }

        let currentOnArt = currentOnArtFemale + currentOnArtMale;

        return { ageGroups, currentOnArt, currentOnArtFemale, currentOnArtMale };
    }
);

export const getCurrentOnArtAdolescents = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            // "< 1",
            // "1-4",
            // "5-9",
            "10 to 14",
            "15 to 19",
            // "20-24",
            // "25-29",
            // "30-34",
            // "35-39",
            // "40-44",
            // "45-49",
            // "50-54",
            // "55-59",
            // "60-64",
            // "65+"
        ];
        let currentOnArtMale = 0;
        let currentOnArtFemale = 0;

        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender?.toLowerCase() === "M".toLowerCase() || list[i].Gender?.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                if(index === -1) {
                    continue;
                }
                currentOnArtMale = currentOnArtMale + parseInt(list[i].txCurr, 10);
            } else if (list[i].Gender?.toLowerCase() === "F".toLowerCase() || list[i].Gender?.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                if(index === -1) {
                    continue;
                }
                currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txCurr, 10);
            }
        }

        let currentOnArt = currentOnArtFemale + currentOnArtMale;

        return { ageGroups, currentOnArt, currentOnArtFemale, currentOnArtMale };
    }
);

export const getCurrentOnArtChildren = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            ' Under 1',
            '01 to 04',
            '05 to 09',
            '10 to 14',
            // "15-19",
            // "20-24",
            // "25-29",
            // "30-34",
            // "35-39",
            // "40-44",
            // "45-49",
            // "50-54",
            // "55-59",
            // "60-64",
            // "65+"
        ];
        let currentOnArtMale = 0;
        let currentOnArtFemale = 0;

        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender?.toLowerCase() === "M".toLowerCase() || list[i].Gender?.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                if(index === -1) {
                    continue;
                }
                currentOnArtMale = currentOnArtMale + parseInt(list[i].txCurr, 10);
            } else if (list[i].Gender?.toLowerCase() === "F".toLowerCase() || list[i].Gender?.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].ageGroup);
                if(index === -1) {
                    continue;
                }
                currentOnArtFemale = currentOnArtFemale + parseInt(list[i].txCurr, 10);
            }
        }

        let currentOnArt = currentOnArtFemale + currentOnArtMale;

        return { ageGroups, currentOnArt, currentOnArtFemale, currentOnArtMale };
    }
);
