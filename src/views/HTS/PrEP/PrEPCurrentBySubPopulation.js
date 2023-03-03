import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';

const PrEPCurrentBySubPopulation = () => {
    const filters = useSelector((state) => state.filters);
    let screenedList = useSelector(prepSelector.getPrepScreenedTrend)
    let inVnewList = useSelector(prepSelector.getPrepEligibleVnewTrend);
    let ctList = useSelector(prepSelector.getPrepCTTrend);
    
    const [prepCurrentBySubPopulation, setPrepCurrentBySubPopulation] =
        useState({});

    const loadPrepCurrentBySubPopulation = useCallback(async () => {
        setPrepCurrentBySubPopulation({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: screenedList.label,
                crosshair: true,
                title: {
                    text: 'MONTH',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS',
                },
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat:
                    '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
                shared: true,
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'SCREENED',
                    data: screenedList.scList,
                    color: '#2F4050',
                },
                {
                    name: 'ELIGIBLE',
                    data: inVnewList.eliList,
                    color: 'rgb(124, 181, 236)',
                },
                {
                    name: 'INITIATED TO PREP',
                    data: inVnewList.iniList,
                    color: '#3281CC',
                },
                {
                    name: 'CONTINUING PREP',
                    data: ctList.ctList,
                    color: '#1AB394',
                },
                // {
                //     name: 'CURRENT ON PREP',
                //     data: [33.6, 68.8, 12, 33],
                //     color: 'rgb(144, 237, 125)',
                // },
            ],
        });
    }, [screenedList, inVnewList, ctList]);

    useEffect(() => {
        loadPrepCurrentBySubPopulation();
    }, [loadPrepCurrentBySubPopulation]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PREP CASCADE TREND
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepCurrentBySubPopulation}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPCurrentBySubPopulation;
