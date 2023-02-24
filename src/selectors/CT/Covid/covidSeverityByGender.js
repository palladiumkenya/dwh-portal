import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidSeverityByGender.listUnfiltered;
const listFiltered = state => state.CovidSeverityByGender.listFiltered;
const listUnfilteredGender = state => state.CovidPLHIVCurrentOnArt.listUnfiltered;
const listFilteredGender = state => state.CovidPLHIVCurrentOnArt.listFiltered;
const filtered = state => state.filters.filtered;

export const getCovidSeverityByGender = createSelector(
    [listUnfiltered, listUnfilteredGender, listFiltered, listFilteredGender, filtered],
    (listUnfiltered, listUnfilteredGender, listFiltered, listFilteredGender, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listGender = filtered ? listFilteredGender : listUnfilteredGender;

        let symptomatic = [];
        let asymptomatic = [];

        let genders = list.map(obj => obj.Gender);
        genders = _.uniq(genders);
        for (let i = 0; i < genders.length; i++) {
            const filteredGenders = list.filter(obj => obj.Gender === genders[i]);
            const genderCurrentOnArt = listGender.filter(obj => obj.Gender === genders[i]);
            let totalGender = 0;
            if (genderCurrentOnArt.length > 0) {
                totalGender = genderCurrentOnArt[0].Adults;
            }

            if (filteredGenders.length > 0) {
                const filterSymptomatic = filteredGenders.filter(
                    (obj) =>
                        obj.PatientStatus === 'Yes' ||
                        obj.PatientStatus === 'Symptomatic'
                );
                const filterAsymptomatic = filteredGenders.filter(
                    (obj) =>
                        obj.PatientStatus === 'No' ||
                        obj.PatientStatus === 'Asymptomatic'
                );

                if (filterSymptomatic.length > 0) {
                    let symp = filterSymptomatic.reduce(
                        (accumulator, object) => {
                            return accumulator + object.Num;
                        },
                        0
                    );
                    let percent = Number(symp) > 0 ? ((Number(symp)/Number(totalGender))*100) : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

                    symptomatic.push(
                        {
                            y: percent,
                            text: symp
                        }
                    );
                } else {
                    symptomatic.push(
                        {
                            y: 0,
                            text: 0
                        }
                    );
                }
                

                if (filterAsymptomatic.length > 0) {
                    let symp = filterAsymptomatic.reduce(
                        (accumulator, object) => {
                            return accumulator + object.Num;
                        },
                        0
                    );
                    let percent =
                        Number(symp) > 0
                            ? (Number(symp) / Number(totalGender)) * 100
                            : 0;
                    percent = Math.round((percent + Number.EPSILON) * 100) / 100;
                    asymptomatic.push({
                        y: percent,
                        text: symp,
                    });
                } else {
                    asymptomatic.push(
                        {
                            y: 0,
                            text: 0
                        }
                    );
                }
            } else {
                asymptomatic.push(
                    {
                        y: 0,
                        text: 0
                    }
                );
                symptomatic.push(
                    {
                        y: 0,
                        text: 0
                    }
                );
            }
        }

        return { genders, asymptomatic, symptomatic };
    }
);
