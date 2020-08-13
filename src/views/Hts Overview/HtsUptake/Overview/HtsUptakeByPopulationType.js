import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../../Shared/Api';

const HtsUptakeByPopulationType = ({ globalFilter }) => {
    const [uptakeByPopulationType, setUptakeByPopulationType] = useState({});

    useEffect(() => {
        loadHtsUptakeByPopulationType();
    }, [globalFilter]);

    const loadHtsUptakeByPopulationType = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/uptakeByPopulationType', params);
        let genPopVal = null;
        let keyPopVal = null;

        for(let i = 0; i < result.length; i++) {
            if(result[i].PopulationType === 'Key Population') {
                keyPopVal = parseInt(result[i].Tested, 10);
            } else if(result[i].PopulationType === 'General Population') {
                genPopVal = parseInt(result[i].Tested, 10);
            }
        }

        setUptakeByPopulationType({
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
                colorByPoint: true,
                data: [{
                    name: 'GENERAL',
                    y: genPopVal,
                    color: "#1AB394"
                }, {
                    name: 'KEY POPULATION',
                    y: keyPopVal,
                    sliced: true,
                    selected: true,
                    color: "#2F4050"
                }]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY POPULATION TYPE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-6">
                            <HighchartsReact highcharts={Highcharts} options={uptakeByPopulationType} />
                        </div>
                        <div className="col-6">

                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeByPopulationType;
