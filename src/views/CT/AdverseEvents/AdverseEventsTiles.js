import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const AdverseEventsTiles = ({ globalFilter }) => {
    const [adults15PlusCurrentOnART, setAdults15PlusCurrentOnART] = useState({
        adults15PlusCurrentOnART: ''
    });
    const [childrenUnder15CurrentOnART, setChildrenUnder15CurrentOnART] = useState({
        childrenUnder15CurrentOnART: ''
    });
    const [under15AdverseEventsDesegregation, setUnder15AdverseEventsDesegregation] = useState({});
    const [adults15PlusAdverseEventsDesegregation, setAdults15PlusAdverseEventsDesegregation] = useState({});

    const loadActiveOnARTAdults = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveARTAdults = 0;

        const result = await getAll('care-treatment/activeArtAdults', params);
        if(result && result.length > 0) {
            ActiveARTAdults = result[0].ActiveARTAdults;
        }

        setAdults15PlusCurrentOnART({
            adults15PlusCurrentOnART: ActiveARTAdults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [globalFilter]);

    const loadActiveOnARTChildren = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveARTChildren = 0;

        const result = await getAll('care-treatment/activeArtChildren', params);
        if(result && result.length > 0) {
            ActiveARTChildren = result[0].ActiveARTChildren;
        }

        setChildrenUnder15CurrentOnART({
            childrenUnder15CurrentOnART: ActiveARTChildren.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [globalFilter]);

    const loadUnder15AdverseEventsDesegregation =  async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let maleData = [];
        let femaleData = [];
        const categories = ['0 - 11 Months', '1 - 5 Yrs', '5 - 9 Yrs', '10 - 14 Yrs'];
        const result = await getAll('care-treatment/getChildrenAdverseEvents', params);
        console.log(result);
        for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if(categories[i] == result[j].AgeGroup && (result[j].Gender.toLowerCase() == "female" || result[j].Gender.toLowerCase() == "f" )) {
                    femaleData.push(result[j].total);
                }

                if(categories[i] == result[j].AgeGroup && (result[j].Gender.toLowerCase() == "male" || result[j].Gender.toLowerCase() == "m" )) {
                    maleData.push(result[j].total);
                }
            }
        }

        setUnder15AdverseEventsDesegregation({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT OF PATIENTS'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Male',
                color: "#1AB394",
                data: maleData
            }, {
                name: 'Female',
                color: "#485969",
                data: femaleData
            }]
        });
    };

    const loadAdults15PlusAdverseEventsDesegregation =  async () => {
        setAdults15PlusAdverseEventsDesegregation({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['15 - 24 Yrs', '25 - 34 Yrs', '35 - 44 Yrs', '45 - 54 Yrs', '55 - 64 Yrs', '>=65 Yrs']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT OF PATIENTS'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Male',
                color: "#1AB394",
                data: [5, 3, 4, 7, 2, 2]
            }, {
                name: 'Female',
                color: "#485969",
                data: [2, 2, 3, 2, 2, 2]
            }]
        });
    };

    useEffect(() => {
        loadActiveOnARTAdults();
        loadActiveOnARTChildren();
        loadUnder15AdverseEventsDesegregation();
        loadAdults15PlusAdverseEventsDesegregation();
    }, [loadActiveOnARTAdults, loadActiveOnARTChildren, loadUnder15AdverseEventsDesegregation, loadAdults15PlusAdverseEventsDesegregation]);

    return (
        <span>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS 15+ CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text"><strong>{adults15PlusCurrentOnART.adults15PlusCurrentOnART}</strong></span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS 15+ ON ART AND DEVELOPED AEs
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">3,071</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NUMBER OF AEs REPORTED CASES IN ADULTS 15+
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">5,477</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">
                                    <strong>{childrenUnder15CurrentOnART.childrenUnder15CurrentOnART}</strong>
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN ON ART AND DEVELOPED AEs
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">3,071</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NUMBER OF AEs REPORTED CASES IN CHILDREN
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">5,477</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            CHILDREN &#60;15 ON ART AND DEVELOPED ADVERSE EVENTS(N=495)
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={under15AdverseEventsDesegregation} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-6">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            ADULTS 15+ ON ART AND DEVELOPED ADVERSE EVENTS(N=495)
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={adults15PlusAdverseEventsDesegregation} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </span>
    );
};

export default AdverseEventsTiles;
