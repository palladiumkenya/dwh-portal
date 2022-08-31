import _ from 'lodash';

import { filtersAtom } from '../../Shared/filtersAtom';

import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const currentOnArtByAgeSexAtom = atom({
    key: 'atomCurrentOnArtByAgeSex',
    default: {
        filtered: [],
        unfiltered: [],
        lastFetch: null,
        loading: false,
    },
    effects_UNSTABLE: [persistAtom],
});

export const currentOnArtByAgeSexSelector = selector({
    key: 'selectorCurrentOnArtByAgeSex',
    get: ({get}) => {
    const filtered = get(filtersAtom);
    const listFiltered = get(currentOnArtByAgeSexAtom).filtered;
    const listUnFiltered = get(currentOnArtByAgeSexAtom).unfiltered;

    
        const list = filtered ? listFiltered : listUnFiltered;
        let ageGroups = [
            '< 1',
            '1-4',
            '5-9',
            '10-14',
            '15-19',
            '20-24',
            '25-29',
            '30-34',
            '35-39',
            '40-44',
            '45-49',
            '50-54',
            '55-59',
            '60-64',
            '65+',
        ];
        let currentOnArtMale = [];
        let currentOnArtFemale = [];
        for (const ageGroup of ageGroups) {
            const ageGroupMaleFilter = list.filter(
                (obj) =>
                    obj.ageGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'M'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Male'.toLowerCase())
            );
            const ageGroupFemaleFilter = list.filter(
                (obj) =>
                    obj.ageGroup === ageGroup &&
                    (obj.Gender.toLowerCase() === 'F'.toLowerCase() ||
                        obj.Gender.toLowerCase() === 'Female'.toLowerCase())
            );
            if (ageGroupMaleFilter.length > 0) {
                currentOnArtMale.push(ageGroupMaleFilter[0].txCurr);
            } else {
                currentOnArtMale.push(0);
            }

            if (ageGroupFemaleFilter.length > 0) {
                currentOnArtFemale.push(ageGroupFemaleFilter[0].txCurr);
            } else {
                currentOnArtFemale.push(0);
            }
        }

        let max = _.max([_.max(currentOnArtMale), _.max(currentOnArtFemale)]);
        currentOnArtMale = currentOnArtMale.map((x) => x * -1);

        return { ageGroups, max, currentOnArtFemale, currentOnArtMale };
    }
});