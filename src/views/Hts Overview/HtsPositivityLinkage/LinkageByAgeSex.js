import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByAgeSex = ({ globalFilter }) => {
    const [linkageByAgeSex, setLinkageByAgeSex] = useState({});

    useEffect(() => {
        loadLinkageByAgeSex();
    }, [globalFilter]);

    const loadLinkageByAgeSex = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const ageGroups = [];

        const ageGroupsMale = [];
        let positiveMale = [];
        let linkedMale = [];
        let linkageMale = [];

        const ageGroupsFemale = [];
        let positiveFemale = [];
        let linkedFemale = [];
        let linkageFemale = [];
        let linkage = [];

        const result = await getAll('hts/linkageByAgeSex', params);

        for(let i = 0; i < result.length; i++) {
            if(ageGroups.indexOf(result[i].AgeGroup) !== -1){
                continue;
            } else{
                ageGroups.push(result[i].AgeGroup);
            }
        }

        for(let i = 0; i < result.length; i++) {
            let index = ageGroups.indexOf(result[i].AgeGroup);
            if (result[i].Gender == 'Male' || result[i].Gender == 'M') {
                ageGroupsMale.splice(index, 0, result[i].AgeGroup);
                positiveMale.splice(index, 0, parseInt(result[i].positive));
                linkedMale.splice(index, 0, parseInt(result[i].linked));
                linkageMale.splice(index, 0, parseFloat(result[i].linkage));
            } else {
                ageGroupsFemale.splice(index, 0, result[i].AgeGroup);
                positiveFemale.splice(index, 0, parseInt(result[i].positive));
                linkedFemale.splice(index, 0, parseInt(result[i].linked));
                linkageFemale.splice(index, 0, parseFloat(result[i].linkage));
            }
        }

        for(let i = 0; i < ageGroups.length; i++) {
            let linkageMaleSingle = 0.0;
            let linkageFemaleSingle = 0.0;
            if (typeof linkageMale[i] !== 'undefined') {
                linkageMaleSingle = linkageMale[i];
            }
            if (typeof linkageFemale[i] !== 'undefined') {
                linkageFemaleSingle = linkageFemale[i];
            }
            linkage[i] = Number(((linkageMaleSingle + linkageFemaleSingle)/2).toFixed(1));
        }

        setLinkageByAgeSex({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            plotOptions: { column: { stacking: 'normal' } },
            xAxis: [{ categories: ageGroups, crosshair: true, title: { text: 'Ages' } }],
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
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: positiveFemale, type: 'column', color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: positiveMale, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ' } },
                { name: 'Linkage', data: linkage, type: 'spline', color: "#E06F07", tooltip: { valueSuffix: '%' }, yAxis: 1 }
            ]
        });
    };

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
