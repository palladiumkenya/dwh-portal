import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.ctPrepAgeSexTrends.listUnfiltered;
const listFiltered = (state) => state.ctPrepAgeSexTrends.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getCTPrepAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        
        let iniListM = [];
        let iniListF = [];
        let agegrp = [
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

        agegrp.forEach((el) => {
            iniListM.push(
                list.find(
                    (x) =>
                        x.Gender.toLowerCase() === 'male' &&
                        x.DATIMAgeGroup === el
                )?.PrepCT ?? 0
            );
            iniListF.push(
                list.find(
                    (x) =>
                        x.Gender.toLowerCase() === 'female' &&
                        x.DATIMAgeGroup === el
                )?.PrepCT ?? 0
            );
        });

        return { iniListF, iniListM, agegrp };
    }
);

