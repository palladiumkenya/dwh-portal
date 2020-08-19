import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../../Shared/Api';

const HtsUptakeByPopulationType = ({ globalFilter }) => {
    const [uptakeByPopulationType, setUptakeByPopulationType] = useState({});
    const [htsOverview, setHtsOverview] = useState({
        genPopTested: '',
        genPopPositive: '',
        keyPopTested: '',
        keyPopPositive: '',
        genPopPositivity: '',
        keyPopPositivity: '',
        totalTested: '',
        totalPositive: '',
        totalPercentage: ''
    });

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
        let genPopPositive = null;
        let keyPopPositive = null;
        let genPopPositivity = null;
        let keyPopPositivity = null;

        for(let i = 0; i < result.length; i++) {
            if(result[i].PopulationType === 'Key Population') {
                keyPopVal = parseInt(result[i].Tested, 10);
                keyPopPositive = parseInt(result[i].positive, 10);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                genPopPositivity = val;
            } else if(result[i].PopulationType === 'General Population') {
                genPopVal = parseInt(result[i].Tested, 10);
                genPopPositive = parseInt(result[i].positive, 10);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                keyPopPositivity = val;
            }
        }

        setHtsOverview({
            genPopTested: genPopVal,
            keyPopTested: keyPopVal,
            genPopPositive: genPopPositive,
            keyPopPositive: keyPopPositive,
            genPopPositivity: genPopPositivity,
            keyPopPositivity: keyPopPositivity,
            totalTested: genPopVal + keyPopVal,
            totalPositive: genPopPositive + keyPopPositive,
            totalPercentage: parseFloat(parseFloat(((genPopPositivity + keyPopPositivity)/2)).toFixed(1))
        });

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
                        HTS uptake and positivity population type
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="row">
                            <div className="col-6">
                                <HighchartsReact highcharts={Highcharts} options={uptakeByPopulationType} />
                            </div>
                            <div className="col-6" style={{backgroundColor: '#ffffff', padding: '3em' }}>
                                <table className="table table-bordered">
                                    <tbody>
                                    <tr><td>TYPE</td><td>TESTED</td><td>POSITIVE</td><td>%</td></tr>
                                    <tr><td>GENERAL</td><td>{htsOverview.genPopTested}</td><td>{htsOverview.genPopPositive}</td><td>{htsOverview.genPopPositivity} % </td></tr>
                                    <tr><td>KEY POPULATION</td><td>{htsOverview.keyPopTested}</td><td>{htsOverview.keyPopPositive}</td><td>{htsOverview.keyPopPositivity} % </td></tr>
                                    <tr><td>TOTAL</td><td>{htsOverview.totalTested}</td><td>{htsOverview.totalPositive}</td><td>{htsOverview.totalPercentage} % </td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeByPopulationType;
