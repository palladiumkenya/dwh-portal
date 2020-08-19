import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../../Shared/Api';

const HtsUptakeTypeAndSelfTest = ({ globalFilter }) => {
    const [uptakeByType, setUptakeByType] = useState({});
    const [uptakeBySelfTest, setUptakeBySelfTest] = useState({});

    useEffect(() => {
        loadUptakeByType();
        loadUptakeBySelfTest();
    }, [globalFilter]);

    const loadUptakeByType = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let couple = null;
        let individual = null;

        const result = await getAll('hts/uptakeByClientTestedAs', params);
        for (let i = 0; i < result.length; i++) {
            if(result[i].ClientTestedAs === "Individual") {
                individual = parseInt(result[i].Tested, 10);
            } else if(result[i].ClientTestedAs === "Couple") {
                couple = parseInt(result[i].Tested, 10);
            }
        }

        setUptakeByType({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Uptake By Type',
                colorByPoint: true,
                data: [{
                    name: 'COUPLE',
                    y: couple,
                    sliced: true,
                    selected: true
                }, {
                    name: 'INDIVIDUAL',
                    y: individual
                }]
            }]
        });
    };

    const loadUptakeBySelfTest = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let yes = null;
        let no = null;

        const result = await getAll('hts/uptakeByClientSelfTested', params);
        for(let i = 0; i < result.length; i++) {
            if(result[i].ClientSelfTested === 'No'){
                no = parseInt(result[i].Tested, 10);
            } else if(result[i].ClientSelfTested === 'Yes') {
                yes = parseInt(result[i].Tested, 10);
            }
        }

        setUptakeBySelfTest({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Uptake By Self Test',
                colorByPoint: true,
                data: [{
                    name: 'YES',
                    y: yes,
                    sliced: true,
                    selected: true
                }, {
                    name: 'NO',
                    y: no
                }]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Couple testing among persons accessing HTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByType} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Uptake of self-test among HTS clients
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeBySelfTest} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeTypeAndSelfTest;
