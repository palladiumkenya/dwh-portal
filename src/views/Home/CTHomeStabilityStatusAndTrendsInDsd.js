import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from './../Shared/Api';

const CTHomeStabilityStatusAndTrendsInDSD = ({ globalFilters }) => {
    const [stabilityStatus, setStabilityStatus] = useState({});
    const [trendsInDSD, setTrendsInDSD] = useState({});

    const loadStabilityStatus = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
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
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y:,.0f})'
                    }
                }
            },
            series: [
                {
                    name: 'Stability Status',
                    colorByPoint: true,
                    data: [
                        { name: 'Stable', y: stable, sliced: true, selected: true, color: "#2F4050" },
                        { name: 'Unstable', y: unStable, color: "#BBE65F" },
                    ]
                }
            ]
        });
    }, [globalFilters]);

    const loadTrendsInDSD = useCallback(async () => {
        let params = null;

        if (globalFilters) {
             params = { ...globalFilters };
        }

        let seriesData = [];
        const result = await getAll('care-treatment/getDsdAppointmentCategorizationByStabilityStatus', params);
        seriesData = [
            {
                name: "< 1 Month",
                color: "#1AB394",
                data: []
            },
            {
                name: "1-2 Months",
                color: "#485969",
                data: []
            },
            {
                name: "3-4 Months",
                color: "#4D8ECC",
                data: []
            },
            {
                name: "> 4 Months",
                color: "#FA7072",
                data: []
            },
        ];

        for (let j = 0; j < seriesData.length; j++) {
            for (let i = 0; i < result.length; i++) {
                if (seriesData[j].name === result[i].AppointmentsCategory)
                    seriesData[j].data.push(result[i].proportionByStability);
            }
        }

        setTrendsInDSD({
            chart: { type: 'column' },
            title: { text: '' },
            xAxis: { categories: ["Stable", "Unstable"] },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage of Patients' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: { headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name}: {point.y:.1f}<br/>Total: {point.stackTotal}' },
            plotOptions: { column: { stacking: 'normal' } },
            series: seriesData
        });
    }, [globalFilters]);

    useEffect(() => {
        loadStabilityStatus();
        loadTrendsInDSD();
    }, [loadStabilityStatus, loadTrendsInDSD]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="cardTitle">
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
                    <CardHeader className="cardTitle">
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
