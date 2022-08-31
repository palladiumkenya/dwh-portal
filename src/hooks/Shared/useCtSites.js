import { atom, useRecoilState, useRecoilValue } from 'recoil';
import _ from 'lodash';
import { filtersAtom } from '../../atoms/Shared/filtersAtom';
import { ctSitesFilterAtom } from '../../atoms/Shared/ctSitesAtom';
import { getAll } from '../../views/Shared/Api';

export const useCtSites = () => {
    const [list, setList] = useRecoilState(ctSitesFilterAtom);

    return async function getData() {
        const response = await getAll('care-treatment/sites', []);
        if (response.length)
            setList(
                Object.assign({}, list, {
                    loading: false,
                    lastFetch: Date.now(),
                    list: response,
                    counties: _.chain(response)
                        .map((l) =>
                            l.county ? l.county.toUpperCase() : 'No County'
                        )
                        .uniq()
                        .sort()
                        .value(),
                    subCounties: _.chain(response)
                        .map((l) =>
                            l.subCounty
                                ? l.subCounty.toUpperCase()
                                : 'No Sub County'
                        )
                        .uniq()
                        .sort()
                        .value(),
                    facilities: _.chain(response)
                        .map((l) => (l.facility ?? 'No Facility'))
                        .uniq()
                        .sort()
                        .value(),
                    partners: _.chain(response)
                        .map((l) => (l.partner ?? 'No Partner'))
                        .uniq()
                        .sort()
                        .value(),
                    agencies: _.chain(response)
                        .map((l) => (l.agency ?? 'No Agency'))
                        .uniq()
                        .sort()
                        .value(),
                    projects: _.chain(response)
                        .map((l) => (l.project ?? 'No Project'))
                        .uniq()
                        .sort()
                        .value(),
                })
            );
    };
};
