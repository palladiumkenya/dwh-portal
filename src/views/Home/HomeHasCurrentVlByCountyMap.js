import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from '../../utils/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../Shared/Api';
import countyMapping from '../Shared/countyMapping.json';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeHasCurrentVlByCountyMap = () => {
    const filters = useSelector(state => state.filters);
    const [hasCurrentVlByCounty, setHomeHasCurrentVlByCountyMap] = useState({});

    const loadHasCurrentVlByCounty = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        const data = [];
        const mappedCounties = countyMapping;
        const result = await getAll('care-treatment/vlUptakeByCounty', params);
        for (let i = 0; i < result.length; i++) {
            let resultCounty = result[i].county;
            resultCounty = resultCounty.toLowerCase();
            resultCounty = resultCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
            resultCounty = resultCounty.replace(' ', '');
            for (let j = 0; j < mappedCounties.length; j++) {
                let mappedCounty = mappedCounties[j].name;
                mappedCounty = mappedCounty.toLowerCase();
                mappedCounty = mappedCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
                mappedCounty = mappedCounty.replace(' ', '');
                if ( mappedCounty === resultCounty) {
                    data.push({
                        id: mappedCounties[j].id,
                        z: result[i].txCurr == null ? 0: result[i].vlDone
                    });
                    continue;
                }
            }
        }

        setHomeHasCurrentVlByCountyMap({
            chart: { map: 'custom/ke-county' },
            title: { text: '' },
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.z.toLocaleString('en') + '</b>';
                }
            },
            mapNavigation: {
                enabled: true,
                enableMouseWheelZoom: true,
                enableButtons: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            legend: { title: { text: 'KEY: VALID VIRAL LOAD' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, },
            series: [
                { name: 'Countries', color: '#E0E0E0', enableMouseTracking: false, showInLegend: false },
                {
                    name: 'Valid Viral Load',
                    type: 'mapbubble',
                    joinBy: ['CC_1', 'id'],
                    data: data,
                    minSize: 4,
                    maxSize: '12%'
                }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadHasCurrentVlByCounty();
    }, [loadHasCurrentVlByCounty]);

    return (
        <HighchartsReact highcharts={Highcharts} options={hasCurrentVlByCounty} constructorType={'mapChart'}/>
    );
}

export default HomeHasCurrentVlByCountyMap;
