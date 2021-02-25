import { createSelector } from 'reselect';
import { roundNumber } from '../../../utils/utils';
import parse from 'proj4/lib/parseCode';

const listUnfiltered = state => state.viralLoadUptakeByAge.listUnfiltered;
const listFiltered = state => state.viralLoadUptakeByAge.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadUptakeByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const sexCategories = ['Male', 'Female'];
        const ageCategories = [
            'Under 1',
            '1 to 4',
            '5 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+'
        ];
        let data = [];
        let arrayData = [];
        let groupPercentageData = [];
        for(let i = 0; i < sexCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let sexIndex = sexCategories.indexOf(list[i].gender);
            let ageIndex = ageCategories.indexOf(list[i].ageGroup);
            if(sexIndex === -1 || ageIndex === -1) {
                continue;
            }
            data[sexIndex][ageIndex] = data[sexIndex][ageIndex] + parseInt(list[i].vlDone);
        }

        const arr = {
            'Under 1': [ 'Under 1' ],
            '1 to 4': [ '1 to 4' ],
            '5 to 9': [ '5 to 9' ],
            '10 to 14': [ '10 to 14' ],
            '15 to 19': [ '15 to 19' ],
            '20 to 24': [ '20 to 24' ],
            '25 to 34': [ '25 to 29', '30 to 34' ],
            '35 to 44': [ '35 to 39', '40 to 44' ],
            '45 to 54': [ '45 to 49', '50 to 54' ],
            '55 to 64': [ '55 to 59', '60 to 64' ],
            '65+': ['65+']
        };
        let filteredValues = null;
        let groupValidVLPercentage = 0;
        let validVLPercentage = 0;
        let groupVlDone = 0;
        let groupEligible = 0;

        Object.keys(arr).forEach(key => {
            groupVlDone = 0;
            groupEligible = 0;
            if (arr[key].length > 1) {
                filteredValues = list.filter(obj => obj.ageGroup === arr[key][0] || obj.ageGroup === arr[key][1]);
            } else {
                filteredValues = list.filter(obj => obj.ageGroup === arr[key][0]);
            }

            for (const filteredValue of filteredValues) {
                groupVlDone += filteredValue.vlDone;
                groupEligible +=filteredValue.eligible;
            }
            groupValidVLPercentage = (parseInt(groupVlDone.toString())/parseInt(groupEligible.toString())*100);
            groupPercentageData.push(parseInt(roundNumber(groupValidVLPercentage)));
            for (const sexCategory of sexCategories) {
                const sexCatValues  = filteredValues.filter(obj => obj.gender === sexCategory);
                let totalVlDone = 0;
                let totalEligible = 0;
                sexCatValues.forEach(item => {
                    totalVlDone += item.vlDone;
                    totalEligible += item.eligible;
                });
                validVLPercentage = (parseInt(totalVlDone)/parseInt(totalEligible)*100);
                arrayData.push(
                    {
                        gender: sexCategory,
                        ageGroup: key,
                        groupPercentage: parseInt(roundNumber(groupValidVLPercentage)),
                        percentage: parseInt(roundNumber(validVLPercentage)),
                        vlDone: totalVlDone,
                        eligible: totalEligible
                    }
                );
            }

        });
        const arrKeys = Object.keys(arr);
        return { ageCategories, sexCategories, data, arrayData, arrKeys, groupPercentageData };
    }
);
