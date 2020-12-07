import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../Shared/Api';
import countyMapping from '../Shared/countyMapping.json';
import mapKenyaByCounty from '../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const HomeHasCurrentVlByCountyMap = () => {
    const [hasCurrentVlByCounty, setHomeHasCurrentVlByCountyMap] = useState({});

    const loadHasCurrentVlByCounty = useCallback(async () => {
        const data = [];
        const mappedCounties = countyMapping;
        const result = await getAll('care-treatment/vlUptakeByCounty', []);
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
            chart: { map: 'custom/kenya-county' },
            title: { text: '' },
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.z.toLocaleString('en') + '</b>';
                }
            },
            legend: { title: { text: 'KEY: HAS CURRENT VL' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, },
            series: [
                { name: 'Countries', color: '#E0E0E0', enableMouseTracking: false, showInLegend: false },
                {
                    name: 'Has Current VL',
                    type: 'mapbubble',
                    joinBy: ['CC_1', 'id'],
                    data: data,
                    minSize: 4,
                    maxSize: '12%'
                }
            ]
        });
    }, []);

    useEffect(() => {
        loadHasCurrentVlByCounty();
    }, [loadHasCurrentVlByCounty]);

    return (
        <HighchartsReact highcharts={Highcharts} options={hasCurrentVlByCounty} constructorType={'mapChart'}/>
    );
}

export default HomeHasCurrentVlByCountyMap;
