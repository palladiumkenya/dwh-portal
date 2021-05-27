import _ from 'lodash';
import { createSelector } from 'reselect';

const list = state => state.practitionersCountByCountyQualification.list;
const population = state => state.populationByCounty.list;
const htsCases = state => state.uptakeByCounty.listUnfiltered;

export const getPractitionersCountByCountyQualification = createSelector(
    [list], (list) => {
        return list;
    }
);

export const getHealthCareWorkersByCounty = createSelector(
    [list, population], (list, population) => {
        const data = _.chain(list)
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .value();
        const result = _.orderBy(_.values(_.merge(_.keyBy(data, 'county'), _.keyBy(population, 'name'))).filter(l => l.count), 'count', 'desc');
        return { counties: result.map(l => l.county), count: result.map(l => l.count), population: result.map(l => Number((l.count/(l.population/1000)).toFixed(2))) };
    }
);

export const getNursesMidwivesByCounty = createSelector(
    [list, population], (list, population) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'NURSE' || l.cadre === 'MENTOR MOTHER')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .value();
        const result = _.orderBy(_.values(_.merge(_.keyBy(data, 'county'), _.keyBy(population, 'name'))).filter(l => l.count), 'count', 'desc');
        return { counties: result.map(l => l.county), count: result.map(l => l.count), population: result.map(l => Number((l.count/(l.population/1000)).toFixed(2))) };
    }
);

export const getHtsProvidersByCounty = createSelector(
    [list, population, htsCases], (list, population, htsCases) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'HTS PROVIDER')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .value();
        const cases = htsCases.map(l => ({ county: l.County.toUpperCase(), cases: l.Tested ? Number(l.Tested):0 }));
        const result = _.chain(data).keyBy('county').merge(
            _.keyBy(population, 'name'),
            _.keyBy(cases, 'county'),
        ).values().filter(l => l.count).map(l => ({
            county: l.county,
            count: l.count,
            population: Number((l.count/(l.population/1000)).toFixed(2)),
            cases: l.cases,
            caseToCountRatio: l.count > 0 ? Number((l.cases/l.count).toFixed(5)) : 0
        })).orderBy('caseToCountRatio', 'desc').value();
        return {
            counties: result.map(l => l.county),
            count: result.map(l => l.count),
            population: result.map(l => l.population),
            cases: result.map(l => l.cases),
            caseToCountRatio: result.map(l => l.caseToCountRatio),
        };
    }
);

export const getMedicalDoctorsByCounty = createSelector(
    [list, population], (list, population) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'MEDICAL DOCTOR')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .value();
        const result = _.orderBy(_.values(_.merge(_.keyBy(data, 'county'), _.keyBy(population, 'name'))).filter(l => l.count), 'count', 'desc');
        return { counties: result.map(l => l.county), count: result.map(l => l.count), population: result.map(l => Number((l.count/(l.population/1000)).toFixed(2))) };
    }
);

export const getClinicalOfficersByCounty = createSelector(
    [list, population], (list, population) => {
        const data = _.chain(list)
            .filter(l => l.cadre === 'CLINICAL OFFICER')
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'count': _.sumBy(objs, 'count'),
            }))
            .value();
        const result = _.orderBy(_.values(_.merge(_.keyBy(data, 'county'), _.keyBy(population, 'name'))).filter(l => l.count), 'count', 'desc');
        return { counties: result.map(l => l.county), count: result.map(l => l.count), population: result.map(l => Number((l.count/(l.population/1000)).toFixed(2))) };
    }
);