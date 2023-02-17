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
        const list = filtered ? listFiltered : listUnfiltered;
        const listVerified = filtered
            ? listFilteredVerified
            : listUnfilteredVerified;

        const facilityData = list.map((e) => {
            let data = listVerified.filter((f) => parseInt(f.MFLCode, 10) === parseInt(e.MFLCode, 10));
            console.log(data)
            return {
                ...e,
                Nupi: data[0]?.NumNupi ?? 0,
                NotNupi: e.TXCURR - (data[0]?.NumNupi ?? 0),
                perc: Math.floor(((data[0]?.NumNupi ?? 0) * 100) / e.TXCURR),
            };
        });
        facilityData.sort(function (a, b) {
            return b.perc - a.perc;
        });
        //find sort array of json objects.


        return { facilityData };
    }
);