import { createSelector } from 'reselect';
import CurrentOnArtVerifiedByAgeSex from './../../../views/CT/CurrentOnArt/CurrentOnArtVerifiedByAgeSex';

const listUnfiltered = state => state.currentOnArtVerifiedByCounty.listUnfiltered;
const listFiltered = state => state.currentOnArtVerifiedByCounty.listFiltered;
const listUnfilteredTxCurr = (state) => state.currentOnArtByCounty.listUnfiltered;
const listFilteredTxCurr = (state) => state.currentOnArtByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByCounty = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let CurrentOnArtVerified = [];
        let listTxCurr = filtered ? listFilteredTxCurr : listUnfilteredTxCurr;
        let currentOnArt = [];
        let verifiedPerc = [];

        for (let i = 0; i < listTxCurr.length; i++) {
            if (!listTxCurr[i].County) {
                continue;
            }
            verifiedPerc.push(
                (((list.find(
                    (x) =>
                        x.County?.toUpperCase() ===
                        listTxCurr[i].County?.toUpperCase()
                )?.NumNupi ?? 0) / listTxCurr[i]?.txCurr) * 100) ?? 0
            );
            counties.push(listTxCurr[i].County.toUpperCase());
            currentOnArt.push(listTxCurr[i].txCurr);
            CurrentOnArtVerified.push(
                list.find(
                    (x) =>
                        x.County?.toUpperCase() ===
                        listTxCurr[i]?.County.toUpperCase()
                )?.NumNupi ?? 0 // 0 if NumNUPI isnt found
            );
        }

        return {
            counties,
            CurrentOnArtVerified,
            currentOnArt,
            verifiedPerc,
        };
    }
);

export const getCurrentOnArtByCountyPerc = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered,
        listUnfilteredTxCurr,
        listFilteredTxCurr
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let listTxCurr = filtered ? listFilteredTxCurr : listUnfilteredTxCurr;
        let newList = []

        for (let i = 0; i < listTxCurr.length; i++) {
            if (!listTxCurr[i].County) {
                continue;
            }

            newList.push({
                county: listTxCurr[i].County.toUpperCase(),
                CurrentOnArtVerified:
                    ((list.find(
                        (x) =>
                            x.County?.toUpperCase() ===
                            listTxCurr[i].County?.toUpperCase()
                    )?.NumNupi ?? 0) /
                        listTxCurr[i]?.txCurr) *
                        100 ?? 0,
                currentOnArt:
                    100 -
                    (((list.find(
                        (x) =>
                            x.County?.toUpperCase() ===
                            listTxCurr[i].County?.toUpperCase()
                    )?.NumNupi ?? 0) /
                        listTxCurr[i]?.txCurr) *
                        100 ?? 0),
                numcurrentOnArtVerified:
                    list.find(
                        (x) =>
                            x.County?.toUpperCase() ===
                            listTxCurr[i]?.County.toUpperCase()
                    )?.NumNupi ?? 0,
                numcurrentOnArt: listTxCurr[i].txCurr,
                verifiedPerc:
                    ((list.find(
                        (x) =>
                            x.County?.toUpperCase() ===
                            listTxCurr[i].County?.toUpperCase()
                    )?.NumNupi ?? 0) /
                        listTxCurr[i]?.txCurr) *
                        100 ?? 0,
            });
        }

        newList = newList.sort(
            (b, a) => a.CurrentOnArtVerified - b.CurrentOnArtVerified
        );

        return {
            counties: newList.map((e) => e.county),
            CurrentOnArtVerified: newList.map((e) => e.CurrentOnArtVerified),
            currentOnArt: newList.map((e) => e.currentOnArt),
            numcurrentOnArtVerified: newList.map(
                (e) => e.numcurrentOnArtVerified
            ),
            numcurrentOnArt: newList.map((e) => e.numcurrentOnArt),
            verifiedPerc: newList.map((e) => e.verifiedPerc),
        };
    }
);