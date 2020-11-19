import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLOutcomesBySex = ({ globalFilters }) => {
    const [vlOutcomesBySexMale, setVLOutcomesBySexMale] = useState({});
    const [vlOutcomesBySexFemale, setVLOutcomesBySexFemale] = useState({});

    const loadVLOutcomesBySex = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const vlOutcomesCategories = ['SUPPRESSED', 'HVL', 'LLV'];
        const result = await getAll('care-treatment/vlOutcomesBySex', params);
        let dataMale = [0, 0, 0];
        let dataFemale = [0, 0, 0];
        for(let i = 0; i < result.length; i++) {
            for(let j = 0; j < vlOutcomesCategories.length; j++) {
                if (result[i].outcome === vlOutcomesCategories[j] && result[i].gender === "Male") {
                    dataMale[j] = dataMale[j] + parseInt(result[i].count);
                }
                if (result[i].outcome === vlOutcomesCategories[j] && result[i].gender === "Female") {
                    dataFemale[j] = dataFemale[j] + parseInt(result[i].count);
                }
            }
        }
        setVLOutcomesBySexMale({
            chart: { type: 'pie' },
            title: { text: 'MALE', align: 'center', verticalAlign: 'middle'},
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    innerSize: '70%',
                }
            },
            series: [{
                name:"VL Outcomes (Male)",
                colorByPoint: true,
                data: [
                    { name: 'SUPPRESSED', y: dataMale[0], color: "#485969" },
                    { name: 'HVL', y: dataMale[1], color: "#1AB394" },
                    { name: 'LLV', y: dataMale[2], color: "#BBE65F" },
                ]
            }]
        });
        setVLOutcomesBySexFemale({
            chart: { type: 'pie' },
            title: { text: 'FEMALE', align: 'center', verticalAlign: 'middle'},
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    innerSize: '70%',
                }
            },
            series: [{
                name:"VL Outcomes (Female)",
                colorByPoint: true,
                data: [
                    { name: 'SUPPRESSED', y: dataFemale[0], color: "#485969" },
                    { name: 'HVL', y: dataFemale[1], color: "#1AB394" },
                    { name: 'LLV', y: dataFemale[2], color: "#BBE65F" },
                ]
            }]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadVLOutcomesBySex();
    }, [loadVLOutcomesBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL OUTCOMES AMONG TXCURR PATIENTS BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <HighchartsReact highcharts={Highcharts} options={vlOutcomesBySexMale} />
                                </div>
                                <div className="col-6">
                                    <HighchartsReact highcharts={Highcharts} options={vlOutcomesBySexFemale} />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLOutcomesBySex;
