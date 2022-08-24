import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeTypeAndSelfTest = () => {
    const filters = useSelector(state => state.filters);
    const [uptakeByType, setUptakeByType] = useState({});
    const [uptakeBySelfTest, setUptakeBySelfTest] = useState({});

    const loadUptakeByType = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYY')
                : moment().subtract(2, 'month').add(17, 'days').format('YYYY'),
            month: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('MM')
                : moment().subtract(2, 'month').add(17, 'days').format('MM'),
        };
        // params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        let couple = null;
        let individual = null;
        const result = await getAll('hts/uptakeByClientTestedAs', params);
        for (let i = 0; i < result.length; i++) {
            if(result[i].ClientTestedAs === "Individual") {
                individual = parseInt(result[i].Tested, 10);
            } else if(result[i].ClientTestedAs === "Couple") {
                couple = parseInt(result[i].Tested, 10);
            }
        }
        setUptakeByType({
            title: { text: '' },
            plotOptions: { pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y:,.0f})'
                }
            }},
            series: [{ type: 'pie', colorByPoint: true, name: 'Uptake By Type', data: [
                { name: 'Couple', y: couple, color: "#1AB394", sliced: true, selected: true },
                { name: 'Individual',  y: individual, color: "#2F4050" },
            ]}]
        });
    }, [filters]);

    const loadUptakeBySelfTest = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYY')
                : moment().subtract(2, 'month').add(17, 'days').format('YYYY'),
            month: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('MM')
                : moment().subtract(2, 'month').add(17, 'days').format('MM'),
        };
        // params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        let yes = null;
        let no = null;
        const result = await getAll('hts/uptakeByClientSelfTested', params);
        for(let i = 0; i < result.length; i++) {
            if(result[i].ClientSelfTested === 'No'){
                no = parseInt(result[i].Tested, 10);
            } else if(result[i].ClientSelfTested === 'Yes') {
                yes = parseInt(result[i].Tested, 10);
            }
        }
        setUptakeBySelfTest({
            title: { text: '' },
            plotOptions: { pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y:,.0f})'
                }
            }},
            series: [{ type: 'pie', colorByPoint: true, name: 'Uptake By Self Test', data: [
                { name: 'Self Tested', y: yes, color: "#1AB394", sliced: true, selected: true },
                { name: 'Did Not Self Test',  y: no, color: "#2F4050" },
            ]}]
        });
    }, [filters]);

    useEffect(() => {
        loadUptakeByType();
        loadUptakeBySelfTest();
    }, [loadUptakeByType, loadUptakeBySelfTest]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HTS uptake among couples
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByType} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        History of HIV self test
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeBySelfTest} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeTypeAndSelfTest;
