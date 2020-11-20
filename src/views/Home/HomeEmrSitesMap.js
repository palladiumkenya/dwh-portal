import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import mapKenyaByCounty from './../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const HomeEmrSitesMap = () => {

    const [counties, setHomeEmrSitesMap] = useState({});

    const loadCounties = useCallback(async () => {
        setHomeEmrSitesMap({
            chart: { map: 'custom/kenya-county' },
            title: { text: '' },
            series: [
                { name: 'AOMRS' },
                { name: 'Ecare' },
                { name: 'IQCare' },
                { name: 'KenyaEMR' },
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
