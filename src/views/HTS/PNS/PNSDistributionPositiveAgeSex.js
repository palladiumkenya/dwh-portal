import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSDistributionPositiveAgeSex = () => {
    const filters = useSelector(state => state.filters);
    const [pnsDistributionPositiveAgeSex, setPNSDistributionPositiveAgeSex] = useState({});

    const loadPNSDistributionPositiveAgeSex = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYY')
                : '',
            fromDate: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(17, 'days')
                      .format('YYYYMM'),
            toDate: filters.toDate
                ? moment(filters.toDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(17, 'days')
                      .format('YYYYMM'),
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
            data[sexIndex][ageIndex] = data[sexIndex][ageIndex] + parseInt(result[i].positive);
        }
        data[0] = data[0].map(value => value * -1);
        setPNSDistributionPositiveAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: ageGroups, title: { text: 'Age Groups' } }
            ],
            yAxis: [
                { title: { text: 'Number Positive' }, labels: { formatter: function () { return Math.abs(this.value); } } }
            ],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18 } },
            tooltip: { formatter: function () {
                    return '<b>Number Positive:</b><br/>' + this.series.name + ', ' + this.point.category +
                        ': ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: data[1], color: "#EA4C8B", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: data[0], color: "#14084D", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadPNSDistributionPositiveAgeSex();
    }, [loadPNSDistributionPositiveAgeSex]);

    return (
        <Card className="trends-card">
            <CardHeader className="cardTitle">CHARACTERISTICS OF SEXUAL CONTACTS WHO TESTED POSITIVE</CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={pnsDistributionPositiveAgeSex} />
                </div>
            </CardBody>
        </Card>
    );
};

export default PNSDistributionPositiveAgeSex;
