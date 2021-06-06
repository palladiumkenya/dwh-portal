import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcCareGiversRelationshipToOvcClient.listFiltered;
const listUnfiltered = state => state.ovcCareGiversRelationshipToOvcClient.listUnfiltered;

export const getOvcCareGiversRelationshipToOvcClient = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayList = list.map(obj => ({
            y: Math.round(obj.Percentage),
            RelationshipToClient: obj.RelationshipToClient,
            text: obj.relationships
        }));

        arrayList.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayList;
    }
);
