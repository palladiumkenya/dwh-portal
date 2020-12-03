import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../Shared/Api';
import countyMapping from '../Shared/countyMapping.json';
import mapKenyaByCounty from '../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const HomeCurrentOnArtByCountyMap = () => {
    const [currentOnArtByCounty, setHomeCurrentOnArtByCountyMap] = useState({});

    const loadCurrentOnArtByCounty = useCallback(async () => {
        const data = [];
        const mappedCounties = countyMapping;
        const result = await getAll('care-treatment/txCurrDistributionByCounty', []);
        for (let i = 0; i < result.length; i++) {
            let resultCounty = result[i].County;
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
                        value: result[i].txCurr === null ? 0:result[i].txCurr
                    });
                    continue;
                }
            }
        }
        
        setHomeCurrentOnArtByCountyMap({
            chart: { map: 'custom/kenya-county' },
            title: { text: '' },
            colors: ['#F5542D', '#F17B25', '#F7DB00', '#8CC63F', '#009245'],
            colorAxis: { dataClassColor: 'category', dataClasses: [
                { to: 5000 },
                { from: 5000, to: 10000 },
                { from: 10000, to: 20000 },
                { from: 20000, to: 50000 },
                { from: 50000 }
            ]},
            tooltip: {
                formatter: function () {
                    return this.category + ' ' + this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': ' + '<b>' + this.point.value + '</b>';
                }
            },
            legend: { title: { text: 'KEY: CURRENT ON ART' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, },
            series: [
                { name: 'Current on ART', data: data, joinBy: ['CC_1', 'id'], states: { hover: { color: '#000000' } } }
            ]
        });
    }, []);

    useEffect(() => {
        loadCurrentOnArtByCounty();
    }, [loadCurrentOnArtByCounty]);

    return (
        <HighchartsReact highcharts={Highcharts} options={currentOnArtByCounty} constructorType={'mapChart'}/>
    );
}

export default HomeCurrentOnArtByCountyMap;
