import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByAgeSex = ({ globalFilters }) => {
    const [linkageByAgeSex, setLinkageByAgeSex] = useState({});

    const loadLinkageByAgeSex = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const sexCategories = ['MALE', 'FEMALE'];
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
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            xAxis: [{ categories: ageCategories, crosshair: true, title: { text: 'Ages' } }],
            yAxis: [
                {
                    title: { text: 'Number Positive', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                },
                {
                    title: { text: 'Linkage (%)', style: { color: Highcharts.getOptions().colors[0] } },
                    labels: { format: '{value} %', style: { color: Highcharts.getOptions().colors[0] } },
                    min: 0,
                    max: 100,
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: positive[1], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: positive[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ' } },
                { name: 'Linkage', data: linkage, type: 'spline', color: "#E06F07", tooltip: { valueSuffix: '%' }, yAxis: 1 }
            ]
        });
    }, [globalFilters]);

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
