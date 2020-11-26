import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const PNSDistributionElicitedAgeSex = ({ globalFilters }) => {
    const [pnsDistributionElicitedAgeSex, setPNSDistributionElicitedAgeSex] = useState({});

    const loadPNSDistributionElicitedAgeSex = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const result = await getAll('hts/pnsSexualContactsByAgeSex', params);
        const ageGroups = ["Under 1", "1-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65+"];
        const ageGroupsMale = ageGroups;
        const ageGroupsFemale = ageGroups;
        let stableMale = [];
        let stableFemale = [];

        for(let i = 0; i < result.length; i++) {
            if (result[i].gender === 'M') {
                let index = ageGroupsMale.indexOf(result[i].ageGroup);
                stableMale.splice(index, 0, parseInt(result[i].stable) * -1);
            }
            if (result[i].gender === 'F') {
                let index = ageGroupsFemale.indexOf(result[i].ageGroup);
                stableFemale.splice(index, 0, parseInt(result[i].stable));
            }
        }

        setPNSDistributionElicitedAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: ageGroups, title: { text: '' }, reversed: false },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    title: { text: 'Number Stable', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { formatter: function () { return Math.abs(this.value); } }
                }
            ],
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {
                    pointWidth: 18,
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'Number Stable: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: stableFemale, color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: stableMale, color: "#1AB394", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSDistributionElicitedAgeSex();
    }, [loadPNSDistributionElicitedAgeSex]);

    return (
        <Card className="trends-card">
            <CardHeader className="cardTitle">DISTRIBUTION OF SEXUAL PARTNERS ELICITED</CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={pnsDistributionElicitedAgeSex} />
                </div>
            </CardBody>
        </Card>
    );
};

export default PNSDistributionElicitedAgeSex;
