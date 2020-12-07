import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../Shared/Api';
import mapKenyaByCounty from '../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const HomeEmrSitesMap = () => {
    const [counties, setHomeEmrSitesMap] = useState({});

    const loadCounties = useCallback(async () => {
        const result = await getAll('care-treatment/sites', []);
        const data = [];
        const emrNames = [];
        let emrSites = [];
        for(let i = 0; i < result.length; i++) {
            if(emrNames.indexOf(result[i].emr) === -1){
                emrNames.push(result[i].emr);
            }
        }
        for(let j = 0; j < emrNames.length; j++) {
            emrSites[j] = [];
        }
        for (let k = 0; k < result.length; k++) {
            let index = emrNames.indexOf(result[k].emr);
            emrSites[index].push({
                name: result[k].facility,
                lat: result[k].latitude,
                lon: result[k].longitude,
            });
        }
        data.push({ name: 'Countries', color: '#E0E0E0', enableMouseTracking: false, showInLegend: false });
        for(let j = 0; j < emrNames.length; j++) {
            data.push({
                name: emrNames[j] == null ? 'Unknown' : emrNames[j],
                type: 'mappoint',
                data: emrSites[j]
            });
        }
        setHomeEmrSitesMap({
            chart: { map: 'custom/kenya-county' },
            title: { text: '' },
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.z.toLocaleString('en') + '</b>';
                }
            },
            legend: { title: { text: 'KEY: EMR SITES' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom' },
            series: data
        });
    }, []);

    useEffect(() => {
        loadCounties();
    }, [loadCounties]);

    return (
        <Row>
            <Col>
                <HighchartsReact highcharts={Highcharts} options={counties} constructorType={'mapChart'}/>
            </Col>
        </Row>
    );
}

export default HomeEmrSitesMap;
