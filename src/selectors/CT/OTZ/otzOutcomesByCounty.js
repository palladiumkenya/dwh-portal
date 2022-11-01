import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzOutcomesByCounty.listFiltered;
const listUnfiltered = state => state.otzOutcomesByCounty.listUnfiltered;

export const getOtzOutcomesByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let catCounties = list.map(obj => obj.County.toUpperCase());
        catCounties = [...new Set(catCounties)];
        const categories = ['opt out of OTZ', 'LTFU','DIED' ,'Transfer out', 'Transition to Adult Care', 'Active'];
        const ArrayValOptOut = [];
        const ArrayValLostToFollowUp = [];
        const ArrayValDead = [];
        const ArrayValTransferOut = [];
        const ArrayValTransitionToAdultCare = [];
        const ArrayValActive = [];
        let build_list = [];
        console.log(list)
        catCounties.forEach((c) => {
            let partner_data = list.filter(
                (x) => x.County.toUpperCase() === c.toUpperCase()
            );
            let partner_data_to = partner_data.filter(
                (x) => x.Outcome.toUpperCase() === 'TRANSFER OUT'
            );
            let sum = partner_data.reduce(
                (n, { outcomesByCounty }) => n + outcomesByCounty,
                0
            );
            let perc =
                ((partner_data_to[0]?.outcomesByCounty ?? 0) * 100) / sum;
            partner_data.forEach((c) => {
                c.perc = perc
                c.County = c.County.toUpperCase()
            });
            build_list.push(...partner_data);
            build_list.sort((b, a) => a.perc - b.perc);
            console.log(build_list)
        });

        catCounties = build_list.map((obj) => obj.County.toUpperCase());
        catCounties = [...new Set(catCounties)];

        for (const category of categories) {
            for (const catCounty of catCounties) {
                const catFilterYear = list.filter(obj => obj.County === catCounty && obj.Outcome.toUpperCase() === category.toUpperCase());
                if (category === 'opt out of OTZ') {
                    if (catFilterYear.length > 0) {
                        ArrayValOptOut.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValOptOut.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'LTFU') {
                    if (catFilterYear.length > 0) {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValLostToFollowUp.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'DIED') {
                    if (catFilterYear.length > 0) {
                        ArrayValDead.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty,
                        });
                    } else {
                        ArrayValDead.push({
                            category,
                            y: 0,
                            catCounty,
                        });
                    }
                }

                if (category === 'Transfer out') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransferOut.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValTransferOut.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'Transition to Adult Care') {
                    if (catFilterYear.length > 0) {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValTransitionToAdultCare.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }

                if (category === 'Active') {
                    if (catFilterYear.length > 0) {
                        ArrayValActive.push({
                            category,
                            y: catFilterYear[0].outcomesByCounty,
                            catCounty
                        });
                    } else {
                        ArrayValActive.push({
                            category,
                            y: 0,
                            catCounty
                        });
                    }
                }
            }
        }

        return { catCounties, ArrayValOptOut, ArrayValLostToFollowUp, ArrayValDead, ArrayValTransferOut, ArrayValTransitionToAdultCare, ArrayValActive };
    }
);


