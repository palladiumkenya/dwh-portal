import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from '../../utils/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../Shared/Api';
import countyMapping from '../Shared/countyMapping.json';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeSuppressionByCountyMap = () => {
    const filters = useSelector(state => state.filters);
    const [suppressionByCounty, setHomeSuppressionByCountyMap] = useState({});

    const loadSuppressionByCounty = useCallback(async () => {
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
                        value: result[i].txCurr > 0 ? ((result[i].suppressed/result[i].txCurr)*100).toFixed(1):0
                    });
                    continue;
                }
            }
        }

        setHomeSuppressionByCountyMap({
            chart: { map: 'custom/ke-county' },
            title: { text: '' },
            colors: ['#F5542D', '#F7DB00', '#8CC63F', '#009245'],
            colorAxis: { dataClassColor: 'category', dataClasses: [
                { to: 50 },
                { from: 50, to: 70 },
                { from: 70, to: 90 },
                { from: 90 }
            ]},
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.value + ' %</b>';
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
            legend: { title: { text: 'KEY: VIRAL SUPPRESSION' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, labelFormat: "{name} %" },
            series: [
                { name: 'Suppression', data: data, joinBy: ['CC_1', 'id'], states: { hover: { color: '#000000' } } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadSuppressionByCounty();
    }, [loadSuppressionByCounty]);

    return (
        <HighchartsReact highcharts={Highcharts} options={suppressionByCounty} constructorType={'mapChart'}/>
    );
}

export default HomeSuppressionByCountyMap;
