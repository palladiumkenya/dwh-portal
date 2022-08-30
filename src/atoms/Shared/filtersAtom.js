import { set } from 'lodash';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const filtersAtom = atom({
    key: 'filters',
    default: {
        filtered: false,
        noCache: false,
        counties: [],
        subCounties: [],
        facilities: [],
        partners: [],
        agencies: [],
        projects: [],
        genders: [],
        datimAgeGroups: [],
        latestPregnancies: [],
        populationTypes: [],
        fromDate: '',
        toDate: '',
        indicators: 'Tx_Curr',
        countyFilterEnabled: true,
        subCountyFilterEnabled: true,
        facilityFilterEnabled: true,
        partnerFilterEnabled: true,
        agencyFilterEnabled: true,
        projectFilterEnabled: false,
        fromDateFilterEnabled: false,
        toDateFilterEnabled: false,
        genderFilterEnabled: false,
        datimAgeGroupFilterEnabled: false,
        latestPregnancyFilterEnabled: false,
        populationTypeFilterEnabled: false,
        indicatorFilterEnabled: false,
    },
    effects_UNSTABLE: [
        persistAtom,
        ({ setSelf, onSet }) => {
            onSet((newVal, oldVal) => {
                console.log('onSet', newVal, oldVal);
            });
        },
    ],
});
