import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageByStrategyEntryPoint = () => {
    const filters = useSelector(state => state.filters);
    const [linkageByStrategy, setLinkageByStrategy] = useState({});
    const [linkageByEntryPoint, setLinkageByEntryPoint] = useState({});

    const loadLinkageByStrategy = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const testStrategies = [];
        let positive = [];
        let linkage = [];
        const result = await getAll('hts/linkageByStrategy', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].testStrategy);
            positive.push(parseInt(result[i].positive, 10));
            const val = parseFloat(parseFloat(result[i].linkage).toFixed(1));
            linkage.push(val);
        }
        setLinkageByStrategy({
            title: { text: '', },
            xAxis: [{ categories: testStrategies, crosshair: true, title: { text: 'Strategies' } }],
            yAxis: [
                { title: { text: 'Number Positive' } },
                { title: { text: 'Linkage (%)' }, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Positive', type: 'column', data: positive, yAxis: 0, color: "#1AB394" },
                { name: 'Linkage', type: 'spline', data: linkage, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: '%' } }
            ]
        });
    }, [filters]);

    const loadLinkageByEntryPoint = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const entryPoints = [];
        let positive = [];
        let linkage = [];
        const result = await getAll('hts/linkageByEntryPoint', params);
        for (let i = 0; i < result.length; i++) {
            entryPoints.push(result[i].entryPoint);
            positive.push(parseInt(result[i].positive, 10));
            const val = parseFloat(parseFloat(result[i].linkage).toFixed(1));
            linkage.push(val);
        }
        setLinkageByEntryPoint({
            title: { text: '', },
            xAxis: [{ categories: entryPoints, crosshair: true, title: { text: 'Entry Points' } }],
            yAxis: [
                { title: { text: 'Number Positive' } },
                { title: { text: 'Linkage (%)' }, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Positive', type: 'column', data: positive, yAxis: 0, color: "#1AB394" },
                { name: 'Linkage', type: 'spline', data: linkage, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: '%' } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadLinkageByStrategy();
        loadLinkageByEntryPoint();
    }, [loadLinkageByStrategy, loadLinkageByEntryPoint]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY STRATEGY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={linkageByStrategy} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY ENTRY POINT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={linkageByEntryPoint} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LinkageByStrategyEntryPoint;
