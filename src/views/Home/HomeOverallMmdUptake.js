import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../Shared/Api';
import moment from "moment";

const HomeOverallMmdUptake = () => {
    const filters = useSelector(state => state.filters);
    const [overallMmdUptake, setHomeOverallMmdUptake] = useState({});

    const loadHomeOverallMmdUptake = useCallback(async () => {
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
        const result = await getAll('care-treatment/dsdMmdUptakeOverall', params);
        let data = [
            result.mmd ? result.mmd: 0,
            result.nonMmd ? result.nonMmd: 0
        ];
        setHomeOverallMmdUptake({
            chart: { type: 'pie' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f} %'
                    },
                    innerSize: '75%',
                }
            },
            series: [{
                name:"OVERALL MMD UPTAKE",
                colorByPoint: true,
                data: [
                    { name: 'NON MMD', y: data[1], color: "#485969" },
                    { name: 'MMD', y: data[0], color: "#1AB394" },
                ]
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadHomeOverallMmdUptake();
    }, [loadHomeOverallMmdUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall MMD Uptake among patients currently on ART
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overallMmdUptake} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HomeOverallMmdUptake;
