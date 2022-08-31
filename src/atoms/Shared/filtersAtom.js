import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const filtersAtom = atom({
    key: 'filters',
    default: false,
    effects_UNSTABLE: [persistAtom],
});
