import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const DistributionUnstable = () => {
    const filters = useSelector(state => state.filters);
    const [distributionUnstable, setDistributionUnstable] = useState({});

    const loadDistributionUnstable = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):'',
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        let highVl = 0;
        let onArtLessThan12Months = 0;
        let ageLessThan20Years = 0;
        let poorAdherence = 0;
        let bmiLessThan18 = 0;
        const result = await getAll('care-treatment/dsdUnstable', params);
        if(result) {
            highVl = result.highVl;
            onArtLessThan12Months = result.onArtLessThan12Months;
            ageLessThan20Years = result.ageLessThan20Years;
            poorAdherence = result.poorAdherence;
            bmiLessThan18 = result.bmiLessThan18;
        }
        const categories = ["HIGH VL", "ART<12 MONTHS", "AGE <20 YEARS", "POOR ADHERANCE", "BMI <18.5"];
        const data = [highVl, onArtLessThan12Months, ageLessThan20Years, poorAdherence, bmiLessThan18];
        setDistributionUnstable({
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
                { name: 'Number of Patients', data: data, type: 'column', color: "#1AB394" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadDistributionUnstable();
    }, [loadDistributionUnstable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF UNSTABLE PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionUnstable} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionUnstable;
