import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageByAgeSex = () => {
    const filters = useSelector(state => state.filters);
    const [linkageByAgeSex, setLinkageByAgeSex] = useState({});

    const loadLinkageByAgeSex = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const sexCategories = ['M', 'F'];
        const ageCategories = [
            'Under 5',
            '5 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+'
        ];
        const result = await getAll('hts/linkageByAgeSex', params);
        let positive = [];
        let linked = [];
        let linkage = [];
        for(let i = 0; i < sexCategories.length; i++) {
            positive[i] = [];
            linked[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                positive[i][j] = 0;
                linked[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let sexIndex = sexCategories.indexOf(result[i].Gender);
            let ageIndex = ageCategories.indexOf(result[i].AgeGroup);
            if(sexIndex === -1 || ageIndex === -1) { // unsupported
                continue;
            }
            positive[sexIndex][ageIndex] = positive[sexIndex][ageIndex] + parseInt(result[i].positive);
            linked[sexIndex][ageIndex] = linked[sexIndex][ageIndex] + parseInt(result[i].linked);
        }
        for(let j = 0; j < ageCategories.length; j++) {
            linkage[j] = Number((((linked[0][j] + linked[1][j])/(positive[0][j] + positive[1][j])) * 100).toFixed(1));
        }
        setLinkageByAgeSex({
            title: { text: '', },
            xAxis: [{ categories: ageCategories, title: { text: 'Age Groups' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Positive' } },
                { title: { text: 'Linkage (%)'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Male', type: 'column', data: positive[0], yAxis: 0, color: "#1AB394" },
                { name: 'Female', type: 'column', data: positive[1], yAxis: 0, color: "#485969" },
                { name: 'Linkage', type: 'spline', data: linkage, yAxis: 1, color: "#E06F07", tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadLinkageByAgeSex();
    }, [loadLinkageByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY AGE AND SEX
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

export default LinkageByAgeSex;
