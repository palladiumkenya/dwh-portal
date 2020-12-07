import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import Highcharts from '../../utils/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../Shared/Api';

const HomeEmrSitesMap = () => {
    const [counties, setHomeEmrSitesMap] = useState({});

    const loadCounties = useCallback(async () => {
        const result = await getAll('care-treatment/sites', []);
        const data = [];
        const emrNames = [];
        let emrSites = [];
        for(let i = 0; i < result.length; i++) {
            if (emrNames.indexOf(result[i].emr) === -1) {
                emrNames.push(result[i].emr);
            }
        }
        for(let j = 0; j < emrNames.length; j++) {
            emrSites[j] = [];
        }
        for (let k = 0; k < result.length; k++) {
            let index = emrNames.indexOf(result[k].emr);
            let lat = parseFloat(result[k].latitude);
            let lon = parseFloat(result[k].longitude);
            if (Number.isFinite(lat) && lat < 5 && lat > -5 && Number.isFinite(lon) && lon > 34 && lon < 41) {
                emrSites[index].push({ name: result[k].facility, lat: lat, lon: lon });
            }
        }
        data.push({
            mapData: Highcharts.maps['custom/ke-province'],
            name: 'Basemap',
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false
        });
        for(let j = 0; j < emrNames.length; j++) {
            data.push({
                name: emrNames[j] === null ? 'Unknown' : emrNames[j],
                type: 'mappoint',
                data: emrSites[j],
                dataLabels: { enabled: false },
            });
        }
        setHomeEmrSitesMap({
            title: { text: '' },
            tooltip: { pointFormat: '<b>{point.name}</b>' },
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
