import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const DistributionMMDStable = () => {
    const filters = useSelector(state => state.filters);
    const [distributionMMDStable, setDistributionMMDStable] = useState({});

    const loadDistributionMMDStable = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const categories = [
            "Standard Care",
            "Fast Track",
            "Community ART Distribution HCW Led",
            "Community ART Distribution peer led",
            "Facility ART distribution Group"
        ];
        let data = [0, 0, 0, 0, 0];
        const result = await getAll('care-treatment/dsdMmdStable', params);
        for(let i = 0; i < result.length; i++) {
            for(let j = 0; j < categories.length; j++) {
                if (result[i].differentiatedCare === categories[j]) {
                    data[j] = data[j] + parseInt(result[i].mmdModels);
                }
            }
        }
        setDistributionMMDStable({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'Number of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: data, type: 'column', color: "#485969" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadDistributionMMDStable();
    }, [loadDistributionMMDStable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF MMD MODELS AMONG STABLE TX CURR PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionMMDStable} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionMMDStable;
