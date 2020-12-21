import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.artOptimizationCurrentByCounty.listUnfiltered;
const listFiltered = state => state.artOptimizationCurrentByCounty.listFiltered;

const counties = state => state.filters.counties;
const subCounties = state => state.filters.subCounties;
const facilities = state => state.filters.facilities;
const partners = state => state.filters.partners;
const agencies = state => state.filters.agencies;
const projects = state => state.filters.projects;

export const getAdultsCurrentByCounty = createSelector(
    [listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects],
    (listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects) => {
        const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
        const list = filtered ? listFiltered : listUnfiltered;
        return list.filter(list => list.ageGroup === "Adult");
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

export const getSexGroups = createSelector(
    [listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects],
    (listUnfiltered, listFiltered, counties, subCounties, facilities, partners, agencies, projects) => {
        const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list).filter(l => l.gender).map(l => l.gender).uniq().sort().value();
    }
);