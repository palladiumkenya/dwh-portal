import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtByFacility.listUnfiltered;
const listFiltered = state => state.currentOnArtByFacility.listFiltered;
const listUnfilteredVerified = (state) => state.currentOnArtVerifiedByFacility.listUnfiltered;
const listFilteredVerified = (state) => state.currentOnArtVerifiedByFacility.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByFacility = createSelector(
    [
        listUnfiltered,
        listFiltered,
        listUnfilteredVerified,
        listFilteredVerified,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        listUnfilteredVerified,
        listFilteredVerified,
        filtered
    ) => {
        const list = Array.isArray(filtered ? listFiltered : listUnfiltered)
            ? (filtered ? listFiltered : listUnfiltered)
            : [];

        const listVerified = Array.isArray(filtered ? listFilteredVerified : listUnfilteredVerified)
            ? (filtered ? listFilteredVerified : listUnfilteredVerified)
            : [];

        // Log warnings in development if something is wrong
        if (!Array.isArray(list)) {
            console.warn("Expected 'list' to be an array but got:", list);
        }
        if (!Array.isArray(listVerified)) {
            console.warn("Expected 'listVerified' to be an array but got:", listVerified);
        }

        console.log(`reached the place`);

        const facilityData = list.map((e) => {
            let data = listVerified.filter((f) => parseInt(f.MFLCode, 10) === parseInt(e.MFLCode, 10));

            return {
                ...e,
                Nupi: data[0]?.NumNupi ?? 0,
                NotNupi: e.TXCURR - (data[0]?.NumNupi ?? 0),
                perc: e.TXCURR > 0 ? (Math.floor(
                    ((data[0]?.NumNupi ?? 0) * 100) / e.TXCURR)) : 0
            };
        });
        facilityData.sort(function (a, b) {
            return b.perc - a.perc;
        });
        //find sort array of json objects.


        return { facilityData };
    }
);
