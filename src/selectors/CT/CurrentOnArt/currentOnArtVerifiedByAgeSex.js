import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtVerifiedByAgeSex.listUnfiltered;
const listFiltered = state => state.currentOnArtVerifiedByAgeSex.listFiltered;
const listUnfilteredAll = (state) => state.currentOnArtByAgeSex.listUnfiltered;
const listFilteredAll = (state) => state.currentOnArtByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByAgeSex = createSelector(
    [
        listUnfiltered,
        listFiltered,
        listUnfilteredAll,
        listFilteredAll,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listUnfilteredAll,
        listFilteredAll,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listAll = filtered ? listFilteredAll : listUnfilteredAll;

        let ageGroups = [
            ' Under 1',
            '01 to 04',
            '05 to 09',
            '10 to 14',
            '15 to 19',
            '20 to 24',
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
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        let verifiedPercFemale = [];
        let verifiedPercMale = [];

        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Male'.toLowerCase())
            );
            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj.AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Female'.toLowerCase())
            );
            if (ageGroupMaleFilter.length > 0) {
                let txcurr = isNaN(
                    (ageGroupMaleFilter[0].NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    ?.replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'M'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Male'.toLowerCase())
                        )?.txCurr
                ) ? 0 : (ageGroupMaleFilter[0].NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    ?.replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'M'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Male'.toLowerCase())
                        )?.txCurr;
                verifiedPercMale.push(
                    txcurr
                );
                currentOnArtMale.push(ageGroupMaleFilter[0].NumNupi);
            } else {
                verifiedPercMale.push(0);
                currentOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                let txcurr = isNaN(
                    (ageGroupFemaleFilter[0]?.NumNupi * 100) /
                    listAll.find(
                        (obj) =>
                            obj.ageGroup
                                .replace('-', ' to ')
                                .replace('<', 'Under ') === ageGroup &&
                            (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                                obj.Gender.toLowerCase() ===
                                    'Female'.toLowerCase())
                    )?.txCurr)? 0 :(ageGroupFemaleFilter[0]?.NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    .replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'F'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Female'.toLowerCase())
                        )?.txCurr ;
                verifiedPercFemale.push(txcurr);
                currentOnArtFemale.push(ageGroupFemaleFilter[0].NumNupi);
            } else {
                verifiedPercFemale.push(0);
                currentOnArtFemale.push(0);
            }
        }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);
        currentOnArtMale = currentOnArtMale.map((x) => x * -1);

        return {
            ageGroups,
            max,
            currentOnArtFemale,
            currentOnArtMale,
            verifiedPercFemale,
            verifiedPercMale,
        };
    }
);

export const getCurrentOnArtByAge = createSelector(
    [
        listUnfilteredAll,
        listFilteredAll,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        
        let ageGroupsLt15 = [' Under 1', '01 to 04', '05 to 09', '10 to 14'];
        let ageGroupGt15 = [
            '15 to 19',
            '20 to 24',
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
        let ageGroupsAdol = [
            '10 to 14',
            '15 to 19',
        ];
        let sumtxcurrLt15 = 0
        let sumtxcurrGt15 = 0
        let sumtxcurrAdol = 0

        for (const ageGroup of ageGroupsLt15) {
            const ageGroupFilter = list.filter(
                (obj) =>
                    obj.ageGroup === ageGroup
            );

            if (ageGroupFilter.length > 0) {
                sumtxcurrLt15 += ageGroupFilter.reduce(
                    (accumulator, current) =>
                        accumulator + Number(current.txCurr),
                    0
                );
            }
        }

        for (const ageGroup of ageGroupGt15) {
            const ageGroupFilter = list.filter(
                (obj) => obj.ageGroup === ageGroup
            );

            if (ageGroupFilter.length > 0) {
                sumtxcurrGt15 += ageGroupFilter.reduce(
                    (accumulator, current) =>
                        accumulator + Number(current.txCurr),
                    0
                );
            }
        }

        for (const ageGroup of ageGroupsAdol) {
            const ageGroupFilter = list.filter(
                (obj) => obj.ageGroup === ageGroup
            );

            if (ageGroupFilter.length > 0) {
                sumtxcurrAdol += ageGroupFilter.reduce(
                    (accumulator, current) =>
                        accumulator + Number(current.txCurr),
                    0
                );
            }
        }
        return {
            sumtxcurrLt15,
            sumtxcurrGt15,
            sumtxcurrAdol,
        };
    }
);

export const getCurrentOnArtByAgeSexLT15 = createSelector(
    [listUnfiltered, listFiltered, listUnfilteredAll, listFilteredAll, filtered],
    (listUnfiltered, listFiltered, listUnfilteredAll, listFilteredAll, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listAll = filtered ? listFilteredAll : listUnfilteredAll;

        let sum = 0
        let ageGroups = [' Under 1', '01 to 04', '05 to 09', '10 to 14'];
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        let verifiedPercFemale = [];
        let verifiedPercMale = [];

        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Male'.toLowerCase())
            );

            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj.AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Female'.toLowerCase())
            );

            if (ageGroupMaleFilter.length > 0) {
                let txcurr = isNaN(
                    (ageGroupMaleFilter[0].NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    ?.replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'M'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Male'.toLowerCase())
                        )?.txCurr
                )
                    ? 0
                    : (ageGroupMaleFilter[0].NumNupi * 100) /
                      listAll.find(
                          (obj) =>
                              obj.ageGroup
                                  ?.replace('-', ' to ')
                                  .replace('<', 'Under ') === ageGroup &&
                              (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                                  obj.Gender.toLowerCase() ===
                                      'Male'.toLowerCase())
                      )?.txCurr;
                verifiedPercMale.push(txcurr);
                sum += ageGroupMaleFilter[0].NumNupi;
                currentOnArtMale.push(ageGroupMaleFilter[0].NumNupi);
            } else {
                verifiedPercMale.push(0);
                currentOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                let txcurr = isNaN(
                    (ageGroupFemaleFilter[0]?.NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    .replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'F'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Female'.toLowerCase())
                        )?.txCurr
                )
                    ? 0
                    : (ageGroupFemaleFilter[0]?.NumNupi * 100) /
                      listAll.find(
                          (obj) =>
                              obj.ageGroup
                                  .replace('-', ' to ')
                                  .replace('<', 'Under ') === ageGroup &&
                              (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                                  obj.Gender.toLowerCase() ===
                                      'Female'.toLowerCase())
                      )?.txCurr;
                verifiedPercFemale.push(txcurr);
                sum += ageGroupFemaleFilter[0].NumNupi;
                currentOnArtFemale.push(ageGroupFemaleFilter[0].NumNupi);
            } else {
                verifiedPercFemale.push(0)
                currentOnArtFemale.push(0);
            }
        }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);

        return { ageGroups, max, currentOnArtFemale, currentOnArtMale, sum, verifiedPercFemale, verifiedPercMale };
    }
);

export const getCurrentOnArtByAgeSexGT15 = createSelector(
    [
        listUnfiltered,
        listFiltered,
        listUnfilteredAll,
        listFilteredAll,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listUnfilteredAll,
        listFilteredAll,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listAll = filtered ? listFilteredAll : listUnfilteredAll;
        let sum = 0;
        let ageGroups = [
            '15 to 19',
            '20 to 24',
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
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        let verifiedPercFemale = [];
        let verifiedPercMale = [];

        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Male'.toLowerCase())
            );
            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj.AgeGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Female'.toLowerCase())
            );
            if (ageGroupMaleFilter.length > 0) {
                let txcurr = isNaN(
                    (ageGroupMaleFilter[0].NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    ?.replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'M'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Male'.toLowerCase())
                        )?.txCurr
                )
                    ? 0
                    : (ageGroupMaleFilter[0].NumNupi * 100) /
                      listAll.find(
                          (obj) =>
                              obj.ageGroup
                                  ?.replace('-', ' to ')
                                  .replace('<', 'Under ') === ageGroup &&
                              (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                                  obj.Gender.toLowerCase() ===
                                      'Male'.toLowerCase())
                      )?.txCurr;
                verifiedPercMale.push(txcurr);
                sum += ageGroupMaleFilter[0].NumNupi;
                currentOnArtMale.push(ageGroupMaleFilter[0].NumNupi);
            } else {
                verifiedPercMale.push(0)
                currentOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                let txcurr = isNaN(
                    (ageGroupFemaleFilter[0]?.NumNupi * 100) /
                        listAll.find(
                            (obj) =>
                                obj.ageGroup
                                    .replace('-', ' to ')
                                    .replace('<', 'Under ') === ageGroup &&
                                (obj.Gender.toLowerCase() ===
                                    'F'.toLowerCase() ||
                                    obj.Gender.toLowerCase() ===
                                        'Female'.toLowerCase())
                        )?.txCurr
                )
                    ? 0
                    : (ageGroupFemaleFilter[0]?.NumNupi * 100) /
                      listAll.find(
                          (obj) =>
                              obj.ageGroup
                                  .replace('-', ' to ')
                                  .replace('<', 'Under ') === ageGroup &&
                              (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                                  obj.Gender.toLowerCase() ===
                                      'Female'.toLowerCase())
                      )?.txCurr;
                verifiedPercFemale.push(txcurr);
                sum += ageGroupFemaleFilter[0].NumNupi;
                currentOnArtFemale.push(ageGroupFemaleFilter[0].NumNupi);
            } else {
                verifiedPercFemale.push(0)
                currentOnArtFemale.push(0);
            }
        }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);

        return { ageGroups, max, currentOnArtFemale, currentOnArtMale, sum, verifiedPercFemale, verifiedPercMale };
    }
);
