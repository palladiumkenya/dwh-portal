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
        const listTxCurr = filtered ? listFilteredTxCurr : listUnfilteredTxCurr;
        let currentOnArt = [];
        let verifiedPerc = [];
        

        for (let i = 0; i < listTxCurr.length; i++) {
            if (!listTxCurr[i].CTPartner) {
                continue;
            }
            partners.push(listTxCurr[i].CTPartner.toUpperCase());
            currentOnArt.push(listTxCurr[i].txCurr);
            verifiedPerc.push(
                (((list.find(
                    (x) =>
                        x.CTPartner.toUpperCase() ===
                        listTxCurr[i].CTPartner.toUpperCase()
                )?.NumNupi ?? 0 )/ listTxCurr[i].txCurr) * 100) ?? 0
            );
            currentOnArtVerified.push(
                list.find(
                    (x) =>
                        x.CTPartner.toUpperCase() ===
                        listTxCurr[i].CTPartner.toUpperCase()
                )?.NumNupi ?? 0 // 0 if NumNUPI isnt found
            );
        }

        return { partners, currentOnArtVerified, currentOnArt, verifiedPerc };
    }
);