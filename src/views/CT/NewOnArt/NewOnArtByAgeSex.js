import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const NewOnArtByAgeSex = () => {
    const filters = useSelector(state => state.filters);
    const [linkageByAgeSex, setNewOnArtByAgeSex] = useState({});

    const loadNewOnArtByAgeSex = useCallback(async () => {
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
        const result = await getAll('care-treatment/txNewByAgeSex', params);
        const ageGroups = ["Under 1", "1 to 4", "5 to 9", "10 to 14", "15 to 19", "20 to 24", "25 to 29", "30 to 34", "35 to 39", "40 to 44", "45 to 49", "50 to 54", "55 to 59", "60 to 64", "65+"];
        const ageGroupsMale = ageGroups;
        const ageGroupsFemale = ageGroups;
        let txNewMale = [];
        let txNewFemale = [];

        for(let i = 0; i < result.length; i++) {
            if (result[i].Gender === 'Male') {
                let index = ageGroupsMale.indexOf(result[i].AgeGroup);
                txNewMale.splice(index, 0, parseInt(result[i].txNew) * -1);
            }
            if (result[i].Gender === 'Female') {
                let index = ageGroupsFemale.indexOf(result[i].AgeGroup);
                txNewFemale.splice(index, 0, parseInt(result[i].txNew));
            }
        }

        setNewOnArtByAgeSex({
            chart: { type: 'bar' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [
                { categories: ageGroupsMale, title: { text: '' }, reversed: false },
                { categories: ageGroupsFemale, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    title: { text: 'Number Positive', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    }
                }
            ],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18, } },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'Number Positive: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: txNewFemale, color: "#EA4C8B", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: txNewMale, color: "#14084D", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadNewOnArtByAgeSex();
    }, [loadNewOnArtByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        NEW ON ART DISTRIBUTION BY GROUP AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={linkageByAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtByAgeSex;
