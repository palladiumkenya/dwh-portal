import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const TrendsInTxCurr = () => {
    const [trendsInTxCurr, setTrendsInTxCurr] = useState({});

    const loadTrendsInTxCurr = useCallback(async () => {
        // let params = null;

        // if (filters) {
        //     params = { ...filters };
        // }

        setTrendsInTxCurr({
            title: {
                text: ''
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: 'Number of Patients'
                }
            },

            xAxis: {
                categories: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
                crosshair: true,
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
            },

            series: [{
                color: "#E06F07",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }, []);

    useEffect(() => {
        loadTrendsInTxCurr();
    }, [loadTrendsInTxCurr]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TRENDS IN TX CURR
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={trendsInTxCurr} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default TrendsInTxCurr;
