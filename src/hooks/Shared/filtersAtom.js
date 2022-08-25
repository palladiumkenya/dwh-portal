import { atom } from 'recoil';

export const currentOnArtByAgeSexAtom = atom({
    key: 'currentOnArtByAgeSex',
    default: {
        filtered: [],
        unfiltered: [],
        lastFetch: null,
        loading: false
    },
});