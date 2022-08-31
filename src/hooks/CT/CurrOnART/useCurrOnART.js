import { atom, useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import useSWR from 'swr';
import {filtersAtom} from "../../../atoms/Shared/filtersAtom"
import {currentOnArtByAgeSexAtom} from "../../../atoms/CT/CurrOnART/currOnARTByAgeSexAtom"
import { getAll } from '../../../views/Shared/Api';


export const useCurrOnART = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error } = useSWR('care-treatment/txCurrByAgeAndSex', getData);

    const filtered = useRecoilValue(filtersAtom);
    const [list, setList] = useRecoilState(currentOnArtByAgeSexAtom);

    async function getData ()
    {
        const params = {}
        //     county: getState().filters.counties,
        //     subCounty: getState().filters.subCounties,
        //     facility: getState().filters.facilities,
        //     partner: getState().filters.partners,
        //     agency: getState().filters.agencies,
        //     project: getState().filters.projects,
        //     gender: getState().filters.genders,
        //     datimAgeGroup: getState().filters.datimAgeGroups,
        //     year: getState().filters.fromDate
        //         ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
        //         : '',
        //     month: getState().filters.fromDate
        //         ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
        //         : '',
        // };
        const response = await getAll('care-treatment/txCurrByAgeAndSex', params);
        filtered
            ? setList(Object.assign({}, list, { filtered: response }))
            : setList(Object.assign({}, list, { unfiltered: response, lastfetch: Date.now() }));
    }
    return data

};