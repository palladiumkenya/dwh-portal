import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const AdverseEventsSeverityLevels = () => {
    const filters = useSelector(state => state.filters);
    const [severityLevels, setSeverityLevels] = useState({});
    const loadSeverityLevels = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const categories = [];
        const severe_values = [];
        const moderate_values = [];
        const mild_values = [];
        const result = await getAll('care-treatment/getReportedAesWithSeverityLevels', params);
        for (let i = 0; i < result.length; i++) {
            categories.push(result[i].AdverseEvent);
        }

        for (let i = 0; i < categories.length; i++) {
            const cat_severe = result.filter(obj => obj.AdverseEvent === categories[i] && obj.Severity === 'Severe');
            const cat_moderate = result.filter(obj => obj.AdverseEvent === categories[i] && obj.Severity === 'Moderate');
            const cat_mild = result.filter(obj => obj.AdverseEvent === categories[i] && obj.Severity === 'Mild');

            const x  = cat_severe.length > 0 ? cat_severe.map(item => item.total).reduce((x, y) => x + y) : 0;
            const y  = cat_moderate.length > 0 ? cat_moderate.map(item => item.total).reduce((x, y) => x + y) : 0;
            const z  = cat_mild.length > 0 ? cat_mild.map(item => item.total).reduce((x, y) => x + y) : 0;

            severe_values.push(x);
            moderate_values.push(y);
            mild_values.push(z);
        }
        setSeverityLevels({
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
                name: 'SEVERE',
                color: "#485969",
                data: severe_values
            }, {
                name: 'MODERATE',
                color: "#1AB394",
                data: moderate_values
            }, {
                name: 'MILD',
                color: "#1f77b4",
                data: mild_values
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadSeverityLevels();
    }, [loadSeverityLevels]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        REPORTED ADVERSE EVENTS WITH SEVERITY LEVELS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={severityLevels} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AdverseEventsSeverityLevels;
