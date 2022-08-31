import { set } from 'lodash';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const uiAtom = atom({
    key: 'ui',
    default: {
        currentPage: "",
        stickyFilter: false,
        homeTab: "emr",
        rrTab: "ct",
        htsTab: "uptake",
        ctTab: "newlyOnArt",
        operationalHISTab: "overview",
    },
    effects_UNSTABLE: [
        persistAtom,
    ],
});
