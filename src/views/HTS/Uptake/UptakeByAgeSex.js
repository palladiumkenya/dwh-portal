import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeByAgeSex = () => {
    const filters = useSelector(state => state.filters);
    const [uptakeByAgeSex, setUptakeByAgeSex] = useState({});

    const loadUptakeByAgeSex = useCallback(async () => {
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
        const ageGroups = [];
        let tested_male = [];
        let tested_female = [];
        let positivity = [];
        const result = await getAll('hts/uptakeByAgeSex', params);
        const result_positivity = await getAll('hts/uptakeByAgeSexPositivity', params);
        for(let i = 0; i < result.length; i++) {
            if(result[i].Gender === 'Male' || result[i].Gender === 'MALE' || result[i].Gender === 'M') {
                tested_male.push(parseInt(result[i].Tested, 10));
                ageGroups.push(result[i].AgeGroup);
            } else if (result[i].Gender === 'Female' || result[i].Gender === 'FEMALE' || result[i].Gender === 'F') {
                tested_female.push(parseInt(result[i].Tested, 10));
            }
        }
        for(let i = 0; i < ageGroups.length; i++) {
            for(let j = 0; j < result_positivity.length; j++) {
                if(ageGroups[i] === result_positivity[j].AgeGroup) {
                    const val = parseFloat(parseFloat(result_positivity[j].positivity).toFixed(1));
                    positivity.push(val);
                }
            }
        }
        setUptakeByAgeSex({
            title: { text: '', },
            xAxis: [{ categories: ageGroups, title: { text: 'Age Groups' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Tested' } },
                { title: { text: 'HIV Positivity'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Male', type: 'column', data: tested_male, yAxis: 0, color: "#1AB394" },
                { name: 'Female', type: 'column', data: tested_female, yAxis: 0, color: "#485969" },
                { name: 'HIV Positivity', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadUptakeByAgeSex();
    }, [loadUptakeByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV TESTING SERVICES UPTAKE AND POSITIVITY BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={uptakeByAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeByAgeSex;
