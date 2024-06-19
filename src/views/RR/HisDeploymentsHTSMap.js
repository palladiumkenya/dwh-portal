import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from '../../utils/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../Shared/Api';
import countyMapping from '../Shared/countyMapping.json';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const HisDeploymentsHTSMap = () => {
    const filters = useSelector(state => state.filters);
    const [htsCoverageByCounty, setHtsCoverageByCountyMap] = useState({});
    const [htsPosCoverageByCounty, setHtsPosCoverageByCountyMap] = useState({});

    const loadCurrentOnArtByCounty = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        const htsPerData = [];
        const htsPosPerData = [];
        const mappedCounties = countyMapping;
        const result = await getAll('common/getCountyCoverageHts', params);
        for (let i = 0; i < result.length; i++) {
            let resultCounty = result[i].County;
            resultCounty = resultCounty ? resultCounty.toLowerCase() : '';
            resultCounty = resultCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
            resultCounty = resultCounty.replace(' ', '');
            for (let j = 0; j < mappedCounties.length; j++) {
                let mappedCounty = mappedCounties[j].name;
                mappedCounty = mappedCounty.toLowerCase();
                mappedCounty = mappedCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
                mappedCounty = mappedCounty.replace(' ', '');
                if ( mappedCounty === resultCounty) {
                    let htsPer = result[i].Tested_DHIS > 0 ? (result[i].Tested_NDW / result[i].Tested_DHIS) * 100 : 0
                    htsPerData.push({
                        id: mappedCounties[j].id,
                        value: htsPer.toFixed(2)
                    });
                    let htsPosPer = result[i].Positive_DHIS > 0 ? (result[i].Positive_NDW / result[i].Positive_DHIS) * 100 : 0
                    htsPosPerData.push({
                        id: mappedCounties[j].id,
                        value: htsPosPer.toFixed(2)
                    });
                }
            }
        }

        setHtsCoverageByCountyMap({
            chart: { map: 'custom/ke-county' },
            title: { text: '' },
            colors: ['#62c1e5', '#E28C78', '#F17B25', '#F7DB00', '#8CC63F', '#009245'],
            colorAxis: { dataClassColor: 'category', dataClasses: [
                { to: 0 },
                { from: 0.01, to: 10 },
                { from: 10, to: 25 },
                { from: 25, to: 45 },
                { from: 45, to: 80 },
                { from: 80 }
            ]},
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.value + '% </b>';
                }
            },
            mapNavigation: {
                enabled: true,
                enableMouseWheelZoom: false,
                enableButtons: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            legend: { title: { text: 'KEY: % NDW Coverage' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, },
            series: [
                { name: 'HTS_TST Coverage', data: htsPerData, joinBy: ['CC_1', 'id'], states: { hover: { color: '#000000' } } }
            ]
        });

        setHtsPosCoverageByCountyMap({
            chart: { map: 'custom/ke-county' },
            title: { text: '' },
            colors: ['#F5542D', '#F17B25', '#F7DB00', '#8CC63F', '#009245'],
            colorAxis: { dataClassColor: 'category', dataClasses: [
                { to: 0 },
                { from: 0, to: 10 },
                { from: 10, to: 20 },
                { from: 20, to: 50 },
                { from: 50000 }
            ]},
            tooltip: {
                formatter: function () {
                    return this.series.name + '<br>' +
                    this.point.properties.NAME_1 + ': <b>' + this.point.value + '% </b>';
                }
            },
            mapNavigation: {
                enabled: true,
                enableMouseWheelZoom: false,
                enableButtons: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            legend: { title: { text: 'KEY: % NDW Coverage' }, layout: 'vertical', align: 'right', verticalAlign: 'bottom', valueDecimals: 0, backgroundColor: 'white', floating: true, },
            series: [
                { name: 'HTS_POS Coverage', data: htsPosPerData, joinBy: ['CC_1', 'id'], states: { hover: { color: '#000000' } } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadCurrentOnArtByCounty();
    }, [loadCurrentOnArtByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        eHTS COVERAGE BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <Row>
                            <Col>
                                <HighchartsReact highcharts={Highcharts} options={htsCoverageByCounty} constructorType={'mapChart'}/>
                            </Col>
                            <Col>
                                <HighchartsReact highcharts={Highcharts} options={htsPosCoverageByCounty} constructorType={'mapChart'}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default HisDeploymentsHTSMap;
