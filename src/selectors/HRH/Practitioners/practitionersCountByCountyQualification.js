import _ from 'lodash';
import { createSelector } from 'reselect';

const list = state => state.practitionersCountByCountyQualification.list;

export const getPractitionersCountByCountyQualification = createSelector(
    [list], (list) => {
        return list;
    }
);

export const getHealthCareWorkersByCounty = createSelector(
    [list], (list) => {
        const data = _.chain(list)
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .orderBy(['county'], ['asc'])
            .value();
        return { counties: data.map(l => l.county), count: data.map(l => l.count) };
    }
);

export const getNursesMidwivesByCounty = createSelector(
    [list], (list) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'NURSE' || l.cadre === 'MENTOR MOTHER')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .orderBy(['county'], ['asc'])
            .value();
        return { counties: data.map(l => l.county), count: data.map(l => l.count) };
    }
);

export const getHtsProvidersByCounty = createSelector(
    [list], (list) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'HTS PROVIDER')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .orderBy(['county'], ['asc'])
            .value();
        return { counties: data.map(l => l.county), count: data.map(l => l.count) };
    }
);

export const getMedicalDoctorsByCounty = createSelector(
    [list], (list) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'MEDICAL DOCTOR')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .orderBy(['county'], ['asc'])
            .value();
        return { counties: data.map(l => l.county), count: data.map(l => l.count) };
    }
);

export const getClinicalOfficersByCounty = createSelector(
    [list], (list) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'CLINICAL OFFICER')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .orderBy(['county'], ['asc'])
            .value();
        return { counties: data.map(l => l.county), count: data.map(l => l.count) };
    }
);