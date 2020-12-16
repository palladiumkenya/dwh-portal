import _ from 'lodash';
import { createSelector } from 'reselect';

const list = state => state.rrSites.list;
// const counties = state => state.rrSites.counties;
const subCounties = state => state.rrSites.subCounties;
const facilities = state => state.rrSites.facilities;
const partners = state => state.rrSites.partners;
const agencies = state => state.rrSites.agencies;
const projects = state => state.rrSites.projects;

const filteredCounties = state => state.filters.counties;
const filteredSubCounties = state => state.filters.subCounties;
// const filteredFacilities = state => state.filters.facilities;
// const filteredPartners = state => state.filters.partners;
// const filteredAgencies = state => state.filters.agencies;
// const filteredProjects = state => state.filters.projects;

export const getSubCounties = createSelector(
    [list, subCounties, filteredCounties],
    (list, subCounties, filteredCounties) => {
        return filteredCounties.length === 0 ?
            subCounties :
            _.chain(list)
            .filter(list => filteredCounties.includes(list.county.toUpperCase()) )
            .map(l => l.subCounty ? l.subCounty.toUpperCase(): 'No Sub County')
            .uniq()
            .sort()
            .value();
    }
);

export const getFacilities = createSelector(
    [list, facilities, filteredCounties, filteredSubCounties],
    (list, facilities, filteredCounties, filteredSubCounties) => {
        return filteredCounties.length === 0 && filteredSubCounties.length === 0 ?
            facilities :
            _.chain(list)
            .filter(list => {
                let val = false;
                if (filteredCounties.length > 0 && filteredSubCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase()) &&
                        filteredSubCounties.includes(list.subCounty.toUpperCase());
                } else if (filteredCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase());
                } else if (filteredSubCounties.length > 0) {
                    val = filteredSubCounties.includes(list.subCounty.toUpperCase());
                }
                return val;
            })
            .map(l => l.facility ? l.facility: 'No Facility')
            .uniq()
            .sort()
            .value();
    }
);

export const getPartners = createSelector(
    [list, partners, filteredCounties, filteredSubCounties],
    (list, partners, filteredCounties, filteredSubCounties) => {
        return filteredCounties.length === 0 && filteredSubCounties.length === 0 ?
            partners :
            _.chain(list)
            .filter(list => {
                let val = false;
                if (filteredCounties.length > 0 && filteredSubCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase()) &&
                        filteredSubCounties.includes(list.subCounty.toUpperCase());
                } else if (filteredCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase());
                } else if (filteredSubCounties.length > 0) {
                    val = filteredSubCounties.includes(list.subCounty.toUpperCase());
                }
                return val;
            })
            .map(l => l.partner ? l.partner: 'No Partner')
            .uniq()
            .sort()
            .value();
    }
);

export const getAgencies = createSelector(
    [list, agencies, filteredCounties, filteredSubCounties],
    (list, agencies, filteredCounties, filteredSubCounties) => {
        return filteredCounties.length === 0 && filteredSubCounties.length === 0 ?
            agencies :
            _.chain(list)
            .filter(list => {
                let val = false;
                if (filteredCounties.length > 0 && filteredSubCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase()) &&
                        filteredSubCounties.includes(list.subCounty.toUpperCase());
                } else if (filteredCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase());
                } else if (filteredSubCounties.length > 0) {
                    val = filteredSubCounties.includes(list.subCounty.toUpperCase());
                }
                return val;
            })
            .map(l => l.partner ? l.partner: 'No Agency')
            .uniq()
            .sort()
            .value();
    }
);


export const getProjects = createSelector(
    [list, projects, filteredCounties, filteredSubCounties],
    (list, projects, filteredCounties, filteredSubCounties) => {
        return filteredCounties.length === 0 && filteredSubCounties.length === 0 ?
            projects :
            _.chain(list)
            .filter(list => {
                let val = false;
                if (filteredCounties.length > 0 && filteredSubCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase()) &&
                        filteredSubCounties.includes(list.subCounty.toUpperCase());
                } else if (filteredCounties.length > 0) {
                    val = filteredCounties.includes(list.county.toUpperCase());
                } else if (filteredSubCounties.length > 0) {
                    val = filteredSubCounties.includes(list.subCounty.toUpperCase());
                }
                return val;
            })
            .map(l => l.project ? l.project: 'No Project')
            .uniq()
            .sort()
            .value();
    }
);