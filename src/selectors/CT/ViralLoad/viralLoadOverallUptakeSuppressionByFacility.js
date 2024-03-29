import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOverallUptakeSuppressionByFacility.listUnfiltered;
const listFiltered = state => state.viralLoadOverallUptakeSuppressionByFacility.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOverallUptakeSuppressionByFacility = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const data = [];
        for(let i = 0; i < list.length; i++) {
            let d = {
                facility: list[i].facility,
                county: list[i].county,
                subCounty: list[i].subCounty,
                partner: list[i].partner,
                txCurr: parseInt(list[i].txCurr, 10),
                eligible: parseInt(list[i].eligible, 10),
                vlDone: parseInt(list[i].vlDone, 10),
                suppressed: parseInt(list[i].suppressed, 10),
                uptake: 0,
                suppression: 0
            };
            if (!d.txCurr) {
                d.txCurr = 0;
            }
            if (!d.eligible) {
                d.eligible = 0;
            }
            if (!d.vlDone) {
                d.vlDone = 0;
            }
            if (!d.suppressed) {
                d.suppressed = 0;
            }
            if (d.eligible > 0) {
                d.uptake = ((d.vlDone/d.eligible)*100).toFixed(0);
            }
            if (d.vlDone > 0) {
                d.suppression = ((d.suppressed/d.vlDone)*100).toFixed(0);
            }
            data.push(d);
        }
        const columns = [
            { name: 'Facility', selector: 'facility', sortable: true},
            { name: 'Partner', selector: 'partner', sortable: true},
            { name: 'County', selector: 'county', sortable: true},
            { name: 'Sub County', selector: 'subCounty', sortable: true},
            { name: 'CURRENT ON ART', selector: 'txCurr', sortable: true, right: true},
            { name: 'VL IN LAST 12 MONTHS', selector: 'eligible', sortable: true, right: true},
            { name: 'FREQUENCY', selector: 'vlDone', sortable: true, right: true},
            // { name: 'Uptake (%)', selector: 'uptake', sortable: true, right: true },
            // { name: 'Suppressed', selector: 'suppressed', sortable: true, right: true},
            { name: 'PERCENTAGE (%)', selector: 'suppression', sortable: true, right: true },
        ];
        return { columns, data };
    }
);

export const getViralLoadOverallUptakeSuppressionByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const data = _.chain(list)
            .filter(l => l.county)
            .map(l => ({ ...l, county: l.county.toUpperCase() }))
            .groupBy('county')
            .map((objs, key) => ({
                'county': key,
                'suppressed': _.sumBy(objs, 'suppressed') > 0 ? _.sumBy(objs, 'suppressed') : 0,
                'suppression': _.sumBy(objs, 'vlDone') > 0 ? Number(((_.sumBy(objs, 'suppressed')/_.sumBy(objs, 'vlDone'))*100).toFixed(0)) :0
            }))
            .orderBy(['suppression', 'county'], ['desc', 'asc'])
            .value();
        return {
            counties: data.map(l => l.county),
            data: data.map(l => ({
                y: l.suppression,
                absoluteY: l.suppressed.toLocaleString('en'),
                text: l.suppression + '%',
            }))
        };
    }
);

export const getViralLoadOverallUptakeSuppressionByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const data = _.chain(list)
            .filter(l => l.partner)
            .map(l => ({ ...l, partner: l.partner.toUpperCase() }))
            .groupBy('partner')
            .map((objs, key) => ({
                'partner': key,
                'suppressed': _.sumBy(objs, 'suppressed') > 0 ? _.sumBy(objs, 'suppressed') : 0,
                'suppression': _.sumBy(objs, 'vlDone') > 0 ? Number(((_.sumBy(objs, 'suppressed')/_.sumBy(objs, 'vlDone'))*100).toFixed(0)) :0
            }))
            .orderBy(['suppression', 'partner'], ['desc', 'asc'])
            .value();
        return {
            partners: data.map(l => l.partner),
            data: data.map(l => ({
                y: l.suppression,
                absoluteY: l.suppressed.toLocaleString('en'),
                text: l.suppression + '%',
            }))
        };
    }
);
