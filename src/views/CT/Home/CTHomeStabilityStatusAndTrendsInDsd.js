import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';

const CTHomeStabilityStatusAndTrendsInDSD = ({ globalFilter }) => {
    const [stabilityStatus, setStabilityStatus] = useState({});
    const [trendsInDSD, setTrendsInDSD] = useState({});

    const loadStabilityStatus = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }
        let stable = 0;
        let unStable = 0;
        const result = await getAll('care-treatment/stabilityStatus', params);
        if(result) {
            stable = result.Stable;
            unStable = result.Unstable;
        }

        setStabilityStatus({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'STABILITY STATUS AMONG ACTIVE PATIENTS',
                    colorByPoint: true,
                    data: [{
                        name: 'UNSTABLE',
                        y: unStable,
                        color: "#1AB394"
                    }, {
                        name: 'STABLE',
                        y: stable,
                        sliced: true,
                        selected: true,
                        color: "#2F4050"
                    }]
                }
            ]
        });
    }, [globalFilter]);

    const loadTrendsInDSD = useCallback(async () => {
        let params = null;

        if (globalFilter) {
             params = { ...globalFilter };
        }


        let appointmentCategory = ["< 1 Month", "> 4 Months", "1-2 Months", "3-4 Months"];
        const seriesData = [];
        const result = await getAll('care-treatment/getDsdAppointmentCategorizationByStabilityStatus', params);
        for (let i = 0; i < appointmentCategory.length; i++) {
            seriesData.push(
                {
                    name: appointmentCategory[i],
                    data: []
                }
            );
        }

        for (let j = 0; j < seriesData.length; j++) {
            for (let i = 0; i < result.length; i++) {
                if (seriesData[j].name === result[i].AppointmentsCategory)
                    seriesData[j].data.push(result[i].patients);
            }
        }

        setTrendsInDSD({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ["STABLE(YES)", "STABLE(NO)"]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
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
            series: seriesData
        });
    }, [globalFilter]);

    useEffect(() => {
        loadStabilityStatus();
        loadTrendsInDSD();
    }, [loadStabilityStatus, loadTrendsInDSD]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        STABILITY STATUS AMONG ACTIVE PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={stabilityStatus} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        APPOINTMENT DURATION BY STABILITY IN ACTIVE PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={trendsInDSD} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CTHomeStabilityStatusAndTrendsInDSD;
