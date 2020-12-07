import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const TreatmentOutcomesOverall = () => {
    const filters = useSelector(state => state.filters);
    const [treatmentOutcomesOverall, setTreatmentOutcomesOverall] = useState({});

    const loadTreatmentOutcomesOverall = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):'',
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped', 'TransferOut'];
        const result = await getAll('care-treatment/treatmentOutcomesOverall', params);
        let data = [0, 0, 0, 0];
        for(let i = 0; i < result.length; i++) {
            for(let j = 0; j < treatmentOutcomesCategories.length; j++) {
                if (result[i].artOutcome === treatmentOutcomesCategories[j]) {
                    data[j] = data[j] + parseInt(result[i].totalOutcomes);
                }
            }
        }
        setTreatmentOutcomesOverall({
            chart: { type: 'pie' },
            title: { text: '' },
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
                name:"Overall Treatment Outcomes",
                colorByPoint: true,
                data: [
                    { name: 'ACTIVE', y: data[0], color: "#485969" },
                    { name: 'DEAD', y: data[1], color: "#60A6E5" },
                    { name: 'LTFU', y: data[2], color: "#1AB394" },
                    { name: 'STOPPED', y: data[3], color: "#BBE65F" },
                    // { name: 'TRANSFER OUT', y: data[3], color: "#BBE65F" },
                ]
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadTreatmentOutcomesOverall();
    }, [loadTreatmentOutcomesOverall]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL ART TREATMENT OUTCOMES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesOverall} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesOverall;
