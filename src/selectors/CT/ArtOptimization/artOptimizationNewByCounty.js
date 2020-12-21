import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationNewByCounty.listUnfiltered;
const listFiltered = state => state.artOptimizationNewByCounty.listFiltered;

const counties = state => state.filters.counties;
const subCounties = state => state.filters.subCounties;
const facilities = state => state.filters.facilities;
const partners = state => state.filters.partners;
const agencies = state => state.filters.agencies;
const projects = state => state.filters.projects;

export const getNewByCounty = createSelector(
    [listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects],
    (listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects) => {
        const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).map(l => {
            if (l.startRegimen !== "TLE" && l.startRegimen !== "TLD" && l.startRegimen !== "Other Regimen") {
                return {
                    ...l,
                    startRegimen: "OTHERS"
                }
            } else {
                return l;
            }
        }).value();
    }
);

export const getCounties = createSelector(
    [listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects],
    (listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects) => {
        const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.county).map(l => l.county).uniq().sort().value();
    }
);

export const getRegimens = createSelector(
    [listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects],
    (listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects) => {
        const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.startRegimen && (l.startRegimen === "TLD" || l.startRegimen === "TLE" || l.startRegimen === "Other Regimen")).map(l => l.startRegimen).uniq().sort().value();
    }
);