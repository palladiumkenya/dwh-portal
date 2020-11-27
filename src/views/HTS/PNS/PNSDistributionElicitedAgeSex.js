import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSDistributionElicitedAgeSex = () => {
    const filters = useSelector(state => state.filters);
    const [pnsDistributionElicitedAgeSex, setPNSDistributionElicitedAgeSex] = useState({});

    const loadPNSDistributionElicitedAgeSex = useCallback(async () => {
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
        const result = await getAll('hts/pnsSexualContactsByAgeSex', params);
        const sexGroups = ['M', 'F'];
        const ageGroups = [];
        let data = [];
        for(let i = 0; i < result.length; i++) {
            if(ageGroups.indexOf(result[i].age) === -1){
                ageGroups.push(result[i].age);
            }
        }
        // seed all values so that missing values default to 0
        for(let i = 0; i < sexGroups.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageGroups.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let sexIndex = sexGroups.indexOf(result[i].gender);
            let ageIndex = ageGroups.indexOf(result[i].age);
            if(sexIndex === -1 || ageIndex === -1 ) { // unsupported
                continue;
            }
            data[sexIndex][ageIndex] = data[sexIndex][ageIndex] + parseInt(result[i].elicited);
        }
        data[0] = data[0].map(value => value * -1);
        setPNSDistributionElicitedAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: ageGroups, title: { text: '' }, reversed: false },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    title: { text: 'Number Elicited', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { formatter: function () { return Math.abs(this.value); } }
                }
            ],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18 } },
            tooltip: { formatter: function () {
                    return '<b>Number Elicited:</b><br/>' + this.series.name + ', ' + this.point.category +
                        ': ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: data[1], color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: data[0], color: "#1AB394", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, [filters]);

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
