import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../Shared/Api';
import countyMapping from '../Shared/countyMapping.json';
import mapKenyaByCounty from '../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const HomeSuppressionByCountyMap = () => {
    const [suppressionByCounty, setHomeSuppressionByCountyMap] = useState({});

    const loadSuppressionByCounty = useCallback(async () => {
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
                        value: result[i].txCurr > 0 ? ((result[i].suppressed/result[i].txCurr)*100).toFixed(1):0
                    });
                    continue;
                }
            }
        }
        
        setHomeSuppressionByCountyMap({
            chart: { map: 'custom/kenya-county' },
            title: { text: '' },
            colors: ['#F5542D', '#F7DB00', '#8CC63F', '#009245'],
            colorAxis: { dataClassColor: 'category', dataClasses: [
                { to: 50 },
                { from: 50, to: 60 },
                { from: 60, to: 70 },
                { from: 70 }
            ]},
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.value + '</b>';
                }
            },
            legend: { title: { text: 'KEY: SUPPRESSION' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, },
            series: [
                { name: 'Suppression', data: data, joinBy: ['CC_1', 'id'], states: { hover: { color: '#000000' } } }
            ]
        });
    }, []);

    useEffect(() => {
        loadSuppressionByCounty();
    }, [loadSuppressionByCounty]);

    return (
        <HighchartsReact highcharts={Highcharts} options={suppressionByCounty} constructorType={'mapChart'}/>
    );
}

export default HomeSuppressionByCountyMap;
