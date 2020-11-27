import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const DistributionStableAgeSex = () => {
    const filters = useSelector(state => state.filters);
    const [distributionStableAgeSex, setDistributionStableAgeSex] = useState({});

    const loadDistributionStableAgeSex = useCallback(async () => {
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
        const result = await getAll('care-treatment/dsdStabilityStatusByAgeSex', params);
        const ageGroups = ["Under 1", "1 to 4", "5 to 9", "10 to 14", "15 to 19", "20 to 24", "25 to 29", "30 to 34", "35 to 39", "40 to 44", "45 to 49", "50 to 54", "55 to 59", "60 to 64", "65+"];
        const ageGroupsMale = ageGroups;
        const ageGroupsFemale = ageGroups;
        let stableMale = [];
        let stableFemale = [];

        for(let i = 0; i < result.length; i++) {
            if (result[i].gender === 'Male') {
                let index = ageGroupsMale.indexOf(result[i].ageGroup);
                stableMale.splice(index, 0, parseInt(result[i].stable) * -1);
            }
            if (result[i].gender === 'Female') {
                let index = ageGroupsFemale.indexOf(result[i].ageGroup);
                stableFemale.splice(index, 0, parseInt(result[i].stable));
            }
        }

        setDistributionStableAgeSex({
            chart: { type: 'bar' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [
                { categories: ageGroups, title: { text: '' }, reversed: false },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    title: { text: 'Number Stable', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    }
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
    }, [filters]);

    useEffect(() => {
        loadDistributionStableAgeSex();
    }, [loadDistributionStableAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionStableAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionStableAgeSex;
