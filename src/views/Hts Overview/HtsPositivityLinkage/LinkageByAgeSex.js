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
            if (result[i].Gender == 'Male') {
                ageGroupsMale.push(result[i].AgeGroup.replace("to", "-") + " YRS");
                positiveMale.push(parseFloat(result[i].positive));
                linkedMale.push(parseFloat(result[i].linked));
                linkageMale.push(parseFloat(result[i].linkage));
            } else {
                ageGroupsFemale.push(result[i].AgeGroup);
                positiveFemale.push(parseFloat(result[i].positive));
                linkedFemale.push(parseFloat(result[i].linked));
                linkageFemale.push(parseFloat(result[i].linkage));
            }
        }

        for(let i = 0; i < linkageMale.length; i++) {
            linkage[i] = (linkageMale[i] + linkageFemale[i])/2;
        }

        setLinkageByAgeSex({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'normal' } },
            xAxis: [{ categories: ageGroupsMale, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'POSITIVE', style: { color: "#252525" } },
                    labels: { format: '{value}', style: { color: "#252525" } },
                    min: 0,
                },
                {
                    title: { text: 'LINKAGE (%)', style: { color: "#252525" } },
                    labels: { format: '{value} %', style: { color: "#252525" } },
                    min: 0,
                    max: 100,
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            legend: {
                align: 'right',
                verticalAlign: 'bottom',
            },
            series: [
                { name: 'FEMALE', data: positiveFemale, type: 'column', color: "#2F4050", tooltip: { valueSuffix: ' ' } },
                { name: 'MALE', data: positiveMale, type: 'column', color: "#DFDFDF", tooltip: { valueSuffix: ' ' } },
                { name: 'LINKAGE', data: linkage, type: 'spline', color: "#1AB394", tooltip: { valueSuffix: '%' }, dashStyle: 'ShortDot', yAxis: 1 }
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
