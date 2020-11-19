import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const PNSScreening = ({ globalFilters }) => {
    const [pnsScreening, setPNSScreening] = useState({});

    const loadPNSScreening = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const vlCategories = ['txCurr', 'eligible', 'vlDone'];
        const vlCategoryNames = ['Index', 'Contact Elicited', 'Known positive'];
        const sexCategories = ['Female','Male'];
        const result = await getAll('care-treatment/vlOverallUptakeAndSuppression', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < sexCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < vlCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let sexIndex = sexCategories.indexOf(result[i].gender);
            if(sexIndex === -1 ) { // unsupported
                continue;
            }
            data[sexIndex][0] = data[sexIndex][0] + parseInt(result[i].txCurr);
            data[sexIndex][1] = data[sexIndex][1] + parseInt(result[i].eligible);
            data[sexIndex][2] = data[sexIndex][2] + parseInt(result[i].vlDone);

            data[1][0] = 0;
        }
        setPNSScreening({
            title: { text: '' },
            xAxis: [{ categories: vlCategoryNames, crosshair: true }],
            yAxis: [{ title: { text: '' } }],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Children', data: data[1], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'Adult', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSScreening();
    }, [loadPNSScreening]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="cardTitle">SCREENING</CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={pnsScreening} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default PNSScreening;
