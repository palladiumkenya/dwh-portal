import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLOverallUptakeAndSuppression = () => {
    const filters = useSelector(state => state.filters);
    const [vlOverallUptakeAndSuppression, setVLOverallUptakeAndSuppression] = useState({});

    const loadVLOverallUptakeAndSuppression = useCallback(async () => {
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
        const vlCategories = ['txCurr', 'eligible', 'vlDone', 'suppressed'];
        const vlCategoryNames = ['TOTAL CURRENT ON ART', 'ELIGIBLE FOR VL (VALID WITHIN 12 MONTHS)', 'VL DONE', 'VIRALLY SUPPRESSED (VS)'];
        const sexCategories = ['Male', 'Female'];
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
            data[sexIndex][3] = data[sexIndex][3] + parseInt(result[i].suppressed);
        }
        setVLOverallUptakeAndSuppression({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: vlCategoryNames,
                crosshair: true
            }],
            yAxis: [{
                min: 0,
                title: { text: 'Percentage of Patients' },
            }],
            tooltip: { shared: true },
            legend: { floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'MALE', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FEMALE', data: data[1], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLOverallUptakeAndSuppression();
    }, [loadVLOverallUptakeAndSuppression]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL VL UPTAKE AND SUPPRESSION AMONG CURRENT ON ART PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlOverallUptakeAndSuppression} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLOverallUptakeAndSuppression;
