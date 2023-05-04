import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.prepMonth1Refill.listUnfiltered;
const listFiltered = (state) => state.prepMonth1Refill.listFiltered;

const listAgeSexUnfiltered = (state) => state.prepMonth1RefillAgeSex.listUnfiltered;
const listAgeSexFiltered = (state) => state.prepMonth1RefillAgeSex.listFiltered;

const listTestedAgeSexUnfiltered = (state) => state.prepTestedMonth1Refill.listUnfiltered;
const listTestedAgeSexFiltered = (state) => state.prepTestedMonth1Refill.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getPrepMonth1Refill = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list[0];
    }
);

export const getPrepMonth1RefillAgeSex = createSelector(
    [
        listAgeSexUnfiltered,
        listAgeSexFiltered,
        listTestedAgeSexUnfiltered,
        listTestedAgeSexFiltered,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listTestedUnfiltered,
        listTestedFiltered,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listTested = filtered ? listTestedFiltered : listTestedUnfiltered;

        let iniListRefill = [];
        let iniListTested = [];
        let perc = [];
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
            iniListRefill.push(
                list.find((x) => x.DATIMAgeGroup === el)?.refilled ?? 0
            );
            iniListTested.push(
                list.find((x) => x.DATIMAgeGroup === el)?.tested ?? 0
            );

            perc.push(
                parseFloat(
                    (
                        ((list.find((x) => x.DATIMAgeGroup === el)
                            ?.refilled ?? 0) *
                            100) /
                        (list.find((x) => x.DATIMAgeGroup === el)
                            ?.tested ?? 0)
                    ).toFixed(1)
                )
            );

        });

        return { iniListTested, iniListRefill, agegrp, perc };
    }
);

