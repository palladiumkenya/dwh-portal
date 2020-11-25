import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import mapKenyaByCounty from './../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenyaByCounty"] = mapKenyaByCounty;

const HomeEmrSitesMap = () => {
    const [counties, setHomeEmrSitesMap] = useState({});
    const loadCounties = useCallback(async () => {
        setHomeEmrSitesMap({
            chart: { map: 'custom/kenyaByCounty' },
            title: { text: '' },
            series: [
                { name: 'AOMRS' },
                { name: 'Ecare' },
                { name: 'IQCare' },
                { name: 'KenyaEMR' },
                // { name: 'KenyaEMR', showInLegend: true, enableMouseTracking: true, type: 'mappoint', color: Highcharts.getOptions().colors[1], data: [
                //     { name: 'GGG', lat: -1.3031934, lon: 36.5672003, dataLabels: {
                //         align: 'left',
                //         x: 5,
                //         verticalAlign: 'middle'
                //     } }
                // ]},
                { name: 'OpenMRS' }
            ]
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
