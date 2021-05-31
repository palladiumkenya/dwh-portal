import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOutcomesHvlByFacility.listUnfiltered;
const listFiltered = state => state.viralLoadOutcomesHvlByFacility.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOutcomesHvlByFacility = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getViralLoadOutcomesHvlByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const data = _.chain(list)
            .filter(l => l.county)
            .map(l => ({ ...l, county: l.county.toUpperCase() }))
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'patients': _.sumBy(objs, 'patients') > 0 ? _.sumBy(objs, 'patients') : 0
            }))
            .orderBy(['patients', 'county'], ['desc', 'asc'])
            .value();
        return {
            counties: data.map(l => l.county),
            data: data.map(l => ({
                y: l.patients,
                absoluteY: l.patients.toLocaleString('en'),
                text: l.patients,
            }))
        };
    }
);

export const getViralLoadOutcomesHvlByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const data = _.chain(list)
            .filter(l => l.partner)
            .map(l => ({ ...l, partner: l.partner.toUpperCase() }))
            .groupBy('partner')
            .map((objs, key) => ({
                'partner': key,
                'patients': _.sumBy(objs, 'patients') > 0 ? _.sumBy(objs, 'patients') : 0
            }))
            .orderBy(['patients', 'partner'], ['desc', 'asc'])
            .value();
        return {
            partners: data.map(l => l.partner),
            data: data.map(l => ({
                y: l.patients,
                absoluteY: l.patients.toLocaleString('en'),
                text: l.patients,
            }))
        };
    }
);
