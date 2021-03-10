import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as dsdUnstableSelectors from '../../../selectors/CT/Dsd/dsdUnstable';
import { formatNumber } from '../../../utils/utils';

const DistributionUnstable = () => {
    const [distributionUnstable, setDistributionUnstable] = useState({});
    const ageLessThan20Years = useSelector(dsdUnstableSelectors.getAgeLessThan20Years);
    const bmiLessThan18 = useSelector(dsdUnstableSelectors.getBmiLessThan18);
    const onArtLessThan12Months = useSelector(dsdUnstableSelectors.getOnArtLessThan12Months);
    const highVl = useSelector(dsdUnstableSelectors.getHighVl);
    const poorAdherence = useSelector(dsdUnstableSelectors.getPoorAdherence);

    const loadDistributionUnstable = useCallback(async () => {
        const categories = ["HIGH VL", "ART<12 MONTHS", "AGE <20 YEARS", "POOR ADHERANCE", "BMI <18.5"];
        const total = highVl + onArtLessThan12Months + ageLessThan20Years + poorAdherence + bmiLessThan18;
        const data = [
            {
                y: Math.round((highVl/total)*100),
                name: "HIGH VL"
            },
            {
                y: Math.round((onArtLessThan12Months/total)*100),
                name: "ART<12 MONTHS"
            },
            {
                y: Math.round((ageLessThan20Years/total)*100),
                name: "AGE <20 YEARS"
            },
            {
                y: Math.round((poorAdherence/total)*100),
                name: "POOR ADHERANCE"
            },
            {
                y: Math.round((bmiLessThan18/total)*100),
                name: "BMI <18.5"
            }
        ];
        data.sort(function(a, b) {
            return b.y - a.y;
        });
        setDistributionUnstable({
            title: { text: '' },
            xAxis: [{ categories: data.map(a => a.name), crosshair: true }],
            yAxis: [{ title: { text: 'PERCENT OF PATIENTS'}, max: 100 }],
            plotOptions: { column: { dataLabels: { enabled: true, format: '{point.y:,.0f}%' } } },
            tooltip: { formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.point.text;
                } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PERCENT OF PATIENTS', data: [
                        {
                            name: categories[0],
                            y: data[0].y,
                            text: ' (' + formatNumber(highVl) + ')'
                        },
                        {
                            name: categories[1],
                            y: data[1].y,
                            text: ' (' + formatNumber(onArtLessThan12Months) + ')'
                        },
                        {
                            name: categories[2],
                            y: data[2].y,
                            text: ' (' + formatNumber(ageLessThan20Years) + ')'
                        },
                        {
                            name: categories[3],
                            y: data[3].y,
                            text: ' (' + formatNumber(poorAdherence) + ')'
                        },
                        {
                            name: categories[4],
                            y: data[4].y,
                            text: ' (' + formatNumber(bmiLessThan18) + ')'
                        }
                    ], type: 'column', color: "#485969" },
            ]
        });
    }, [highVl, onArtLessThan12Months, ageLessThan20Years, poorAdherence, bmiLessThan18]);

    useEffect(() => {
        loadDistributionUnstable();
    }, [loadDistributionUnstable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CHARACTERISTICS OF UNSTABLE PATIENTS
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
