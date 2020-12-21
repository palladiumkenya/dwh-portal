import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from '../../utils/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { loadGpsSites } from '../../actions/Home/gpsSitesActions';

const HomeEmrSitesMap = () => {
    const [emrSitesMap, setHomeEmrSitesMap] = useState({});
    const gpsSites = useSelector(state => state.gpsSites.list);
    const dispatch = useDispatch();

    const loadEmrSitesMaps = useCallback(async () => {
        const data = [];
        const emrNames = [];
        let emrSites = [];
        for(let i = 0; i < gpsSites.length; i++) {
            if (emrNames.indexOf(gpsSites[i].emr) === -1) {
                emrNames.push(gpsSites[i].emr);
            }
        }
        for(let j = 0; j < emrNames.length; j++) {
            emrSites[j] = [];
        }
        for (let k = 0; k < gpsSites.length; k++) {
            let index = emrNames.indexOf(gpsSites[k].emr);
            let lat = parseFloat(gpsSites[k].latitude);
            let lon = parseFloat(gpsSites[k].longitude);
            if (Number.isFinite(lat) && lat < 5 && lat > -5 && Number.isFinite(lon) && lon > 34 && lon < 41) {
                emrSites[index].push({ name: gpsSites[k].facility, lat: lat, lon: lon });
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
    }, [gpsSites]);

    useEffect(() => {
        dispatch(loadGpsSites());
        loadEmrSitesMaps();
    }, [dispatch, loadEmrSitesMaps]);

    return (
        <Row>
            <Col>
                <HighchartsReact highcharts={Highcharts} options={emrSitesMap} constructorType={'mapChart'}/>
            </Col>
        </Row>
    );
}

export default HomeEmrSitesMap;
