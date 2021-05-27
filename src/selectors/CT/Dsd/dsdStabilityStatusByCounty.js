import { createSelector } from 'reselect';
import _ from 'lodash';

const listUnfiltered = state => state.dsdStabilityStatusByCounty.listUnfiltered;
const listFiltered = state => state.dsdStabilityStatusByCounty.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredStability = state => state.dsdAppointmentDurationByCounty.listUnfiltered;
const listFilteredStability = state => state.dsdAppointmentDurationByCounty.listFiltered;

const listUnfilteredCurrentOnART = state => state.currentOnArtDistributionByCounty.listUnfiltered;
const listFilteredCurrentOnART = state => state.currentOnArtDistributionByCounty.listFiltered;

export const getStabilityStatusByCounty = createSelector(
    [listUnfilteredStability, listUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered],
    (listUnfilteredStability, listUnfilteredCurrentOnART, listFilteredStability, listFilteredCurrentOnART, filtered) => {
        const list = filtered ? listFilteredStability : listUnfilteredStability;
        const listCurrentOnART = filtered ? listFilteredCurrentOnART : listUnfilteredCurrentOnART;

        let counties = _.uniqBy(list, 'county');
        counties = counties.map(obj => obj.county ? obj.county.toUpperCase() : "");

        const stability = [];
        for (const county of counties) {
            const currentOnARTExcludedAgeGroups = listCurrentOnART.filter(obj => obj.ageGroup !== '<1'
                && obj.ageGroup !== '1-4'
                && obj.ageGroup !== '5-9'
                && obj.ageGroup !== '10-14'
                && obj.ageGroup !== '15-19');

            const selectedCounty = currentOnARTExcludedAgeGroups.filter(obj => obj.County ? obj.County.toUpperCase() === county : null);

            const withExcludedAgeGroups = list.filter(obj => obj.DATIM_AgeGroup !== 'Under 1'
                && obj.DATIM_AgeGroup !== '1 to 4'
                && obj.DATIM_AgeGroup !== '5 to 9'
                && obj.DATIM_AgeGroup !== '10 to 14'
                && obj.DATIM_AgeGroup !== '15 to 19');

            const countyData = withExcludedAgeGroups.filter(obj => obj.county ? obj.county.toUpperCase() === county : []);
            if (selectedCounty.length > 0 && countyData.length > 0) {
                const countyStablePatients = _.sumBy(countyData, 'stablePatients');
                const txCurr = _.sumBy(selectedCounty, 'txCurr');

                stability.push({
                    name: county,
                    y: Math.round(((countyStablePatients/txCurr)*100)) > 100 ? 100 : Math.round(((countyStablePatients/txCurr)*100)),
                    text:  '<b>Stable Patients: ' + countyStablePatients + ' </b><br/> <b>Txcurr:' + txCurr + '</b>'
                });
            } else {
                stability.push({
                    name: county,
                    y: 0,
                    text:  0
                });
            }
        }

        stability.sort(function(a, b) {
            return b.y - a.y;
        });
        return { counties, stability };
    }
);

export const getStabilityStatusByCountyMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const counties = [];
        const mmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            counties.push(list[i].county.toUpperCase());
            mmd.push(list[i].mmd);
        }
        return { counties, mmd };
    }
);

export const getStabilityStatusByCountyNonMmd = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const counties = [];
        const nonMmd = [];
        for(let i = 0; i < list.length; i++) {
            if (!list[i].county) {
                continue;
            }
            counties.push(list[i].county.toUpperCase());
            nonMmd.push(list[i].nonMmd);
        }
        return { counties, nonMmd };
    }
);
