import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const LinkageByPopulationType = ({ globalFilter }) => {
    const [linkageByPopulationType, setLinkageByPopulationType] = useState({});
    const [linkage, setLinkage] = useState({
        genPopTested: '',
        keyPopTested: '',
        genPopPositive: '',
        keyPopPositive: '',
        genPopLinked: '',
        keyPopLinked: '',
        genPopLinkage: '',
        keyPopLinkage: '',
    });

    useEffect(() => {
        loadLinkageByPopulationType();
    }, [globalFilter]);

    const loadLinkageByPopulationType = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/linkageByPopulationType', params);
        let genPopTested = null;
        let keyPopTested = null;
        let genPopPositive = null;
        let keyPopPositive = null;
        let genPopLinked = null;
        let keyPopLinked = null;
        let genPopLinkage = null;
        let keyPopLinkage = null;

        for(let i = 0; i < result.length; i++) {
            if(result[i].PopulationType === 'Key Population') {
                keyPopTested = parseInt(result[i].tested, 10);
                keyPopPositive = parseInt(result[i].positive, 10);
                keyPopLinked = parseInt(result[i].linked, 10);
                keyPopLinkage = parseFloat(result[i].linkage);
            } else if(result[i].PopulationType === 'General Population') {
                genPopTested = parseInt(result[i].tested, 10);
                genPopPositive = parseInt(result[i].positive, 10);
                genPopLinked = parseInt(result[i].linked, 10);
                genPopLinkage = parseFloat(result[i].linkage);
            }
        }

        setLinkage({
            genPopTested: genPopTested,
            keyPopTested: keyPopTested,
            genPopPositive: genPopPositive,
            keyPopPositive: keyPopPositive,
            genPopLinked: genPopLinked,
            keyPopLinked: keyPopLinked,
            genPopLinkage: genPopLinkage,
            keyPopLinkage: keyPopLinkage,
        });

        setLinkageByPopulationType({
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
                name:"Linked",
                colorByPoint: true,
                data: [{
                    name: 'GENERAL',
                    y: genPopLinked,
                    color: "#1AB394"
                }, {
                    name: 'KEY POPULATION',
                    y: keyPopLinked,
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
                        <div className="row">
                            <div className="col-6">
                                <HighchartsReact highcharts={Highcharts} options={linkageByPopulationType} />
                            </div>
                            <div className="col-6" style={{backgroundColor: '#ffffff', padding: '3em' }}>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr><td>TYPE</td><td>TESTED</td><td>POSITIVE</td><td>%</td></tr>
                                        <tr><td>GENERAL</td><td>{linkage.genPopTested}</td><td>{linkage.genPopPositive}</td><td>{parseFloat(linkage.genPopLinkage).toFixed(2)} % </td></tr>
                                        <tr><td>KEY POPULATION</td><td>{linkage.keyPopTested}</td><td>{linkage.keyPopPositive}</td><td>{parseFloat(linkage.keyPopLinkage).toFixed(2)} % </td></tr>
                                        <tr><td>TOTAL</td><td>{linkage.genPopTested + linkage.keyPopTested}</td><td>{linkage.genPopPositive + linkage.keyPopPositive}</td><td>{((linkage.genPopLinkage + linkage.keyPopLinkage)/2).toFixed(2)} % </td></tr>
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

export default LinkageByPopulationType;
