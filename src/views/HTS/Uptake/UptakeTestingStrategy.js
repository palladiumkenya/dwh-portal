import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeTestingStrategy = () => {
    const filters = useSelector(state => state.filters);
    const [hivTestingType, setHivTestingType] = useState({});
    const [uptakeByEntryPoint, setUptakeByEntryPoint] = useState({});

    const loadHivTestingType = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const testStrategies = [];
        let tested = [];
        let positivity = [];
        const result = await getAll('hts/uptakeByTestStrategy', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].TestStrategy);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setHivTestingType({
            title: { text: '', },
            xAxis: [{ categories: testStrategies, title: { text: 'Strategies' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Tested' } },
                { title: { text: 'HIV Positivity'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Tested', type: 'column', data: tested, yAxis: 0, color: "#1AB394" },
                { name: 'HIV Positivity', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    const loadUptakeByEntryPoint = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const testStrategies = [];
        let tested = [];
        let positivity = [];
        const result = await getAll('hts/uptakeByEntryPoint', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].EntryPoint);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setUptakeByEntryPoint({
            title: { text: '', },
            xAxis: [{ categories: testStrategies, title: { text: 'Entry Points' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Tested' } },
                { title: { text: 'HIV Positivity'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Tested', type: 'column', data: tested, yAxis: 0, color: "#1AB394" },
                { name: 'HIV Positivity', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadHivTestingType();
        loadUptakeByEntryPoint();
    }, [loadHivTestingType, loadUptakeByEntryPoint]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY STRATEGY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={hivTestingType} />
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                       UPTAKE BY ENTRY POINT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByEntryPoint} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeTestingStrategy;
