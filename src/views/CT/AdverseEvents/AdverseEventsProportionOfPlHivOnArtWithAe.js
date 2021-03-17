import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';

const AdverseEventsProportionOfPlHivOnArtWithAe = () => {
    const [proportionOfPlHivOnArtWithAe, setProportionOfPlHivOnArtWithAe] = useState({});

    const loadProportionOfPlHivOnArtWithAe = useCallback(async () => {
        setProportionOfPlHivOnArtWithAe({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS WITH AEs'
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
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'ACTIVE',
                data: [5, 3, 4, 7, 2],
                color: '#69B34C'
            }, {
                name: 'LTFU',
                data: [2, 2, 3, 2, 1],
                color: '#F08532'
            }, {
                name: 'DEAD',
                data: [3, 4, 4, 2, 5],
                color: '#FC2626'
            }]
        });
    }, []);

    useEffect(() => {
        loadProportionOfPlHivOnArtWithAe();
    }, [loadProportionOfPlHivOnArtWithAe]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV ON ART WITH ADVERSE DRUG REACTIONS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivOnArtWithAe} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsProportionOfPlHivOnArtWithAe;
