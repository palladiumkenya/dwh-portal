import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtVerifiedByPartner.listUnfiltered;
const listFiltered = (state) => state.currentOnArtVerifiedByPartner.listFiltered;
const listUnfilteredTxCurr = (state) => state.currentOnArtByPartner.listUnfiltered;
const listFilteredTxCurr = (state) => state.currentOnArtByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByPartner = createSelector(
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
        let partners = [];
        let currentOnArtVerified = [];
        let listTxCurr = filtered ? listFilteredTxCurr : listUnfilteredTxCurr;
        let currentOnArt = [];
        let verifiedPerc = [];

        listTxCurr = listTxCurr.sort((a, b) => b.txCurr - a.txCurr);

        for (let i = 0; i < listTxCurr.length; i++) {
            if (!listTxCurr[i].CTPartner) {
                continue;
            }
            partners.push(listTxCurr[i].CTPartner.toUpperCase());
            currentOnArt.push(listTxCurr[i].txCurr);
            verifiedPerc.push(
                (((list.find(
                    (x) =>
                        x.CTPartner === null ? 
                            x?.CTPartner === listTxCurr[i]?.CTPartner:
                            x?.CTPartner.toUpperCase() === listTxCurr[i]?.CTPartner.toUpperCase()
                )?.NumNupi ?? 0 )/ listTxCurr[i].txCurr) * 100) ?? 0
            );
            currentOnArtVerified.push(
                list.find(
                    (x) =>
                        x.CTPartner === null ? 
                            x.CTPartner === listTxCurr[i].CTPartner:
                            x?.CTPartner.toUpperCase() === listTxCurr[i].CTPartner.toUpperCase()
                )?.NumNupi ?? 0 // 0 if NumNUPI isnt found
            );
        }

        return { partners, currentOnArtVerified, currentOnArt, verifiedPerc };
    }
);

export const getCurrentOnArtByPartnerPerc = createSelector(
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
        let newList = [];

        for (let i = 0; i < listTxCurr.length; i++) {
            if (!listTxCurr[i].CTPartner) {
                continue;
            }

            newList.push({
                partners: listTxCurr[i].CTPartner.toUpperCase(),
                currentOnArtVerified:
                    ((list.find(
                        (x) =>
                            x?.CTPartner === null ?
                                x?.CTPartner === listTxCurr[i]?.CTPartner :
                                x?.CTPartner.toUpperCase() === listTxCurr[i]?.CTPartner.toUpperCase()
                    )?.NumNupi ?? 0) /
                        listTxCurr[i].txCurr) *
                        100 ?? 0,
                currentOnArt:
                    100 -
                    (((list.find(
                        (x) =>
                            x?.CTPartner === null ?
                                x?.CTPartner === listTxCurr[i]?.CTPartner :
                                x?.CTPartner.toUpperCase() === listTxCurr[i]?.CTPartner.toUpperCase()
                    )?.NumNupi ?? 0) /
                        listTxCurr[i].txCurr) *
                        100 ?? 0),
                numcurrentOnArtVerified:
                    list.find(
                        (x) =>
                            x?.CTPartner === null ?
                                x?.CTPartner === listTxCurr[i]?.CTPartner :
                                x?.CTPartner.toUpperCase() === listTxCurr[i]?.CTPartner.toUpperCase()
                    )?.NumNupi ?? 0,
                numcurrentOnArt: listTxCurr[i].txCurr,
                verifiedPerc:
                    ((list.find(
                        (x) =>
                            x?.CTPartner === null ?
                                x.CTPartner === listTxCurr[i].CTPartner :
                                x.CTPartner.toUpperCase() === listTxCurr[i].CTPartner.toUpperCase()
                    )?.NumNupi ?? 0) /
                        listTxCurr[i].txCurr) *
                        100 ?? 0,
            });
        }
        
        newList = newList.sort(
            (b, a) => a.currentOnArtVerified - b.currentOnArtVerified
        );

        return {
            partners: newList.map((e) => e.partners),
            currentOnArtVerified: newList.map((e) => e.currentOnArtVerified),
            currentOnArt: newList.map((e) => e.currentOnArt),
            numcurrentOnArtVerified: newList.map(
                (e) => e.numcurrentOnArtVerified
            ),
            numcurrentOnArt: newList.map((e) => e.numcurrentOnArt),
            verifiedPerc: newList.map((e) => e.verifiedPerc),
        };
    }
);
