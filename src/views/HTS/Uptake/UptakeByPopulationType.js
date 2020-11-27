import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeByPopulationType = () => {
    const filters = useSelector(state => state.filters);
    const [uptakeByPopulationType, setUptakeByPopulationType] = useState({});
    const [htsOverview, setHtsOverview] = useState({
        genPopTested: '',
        genPopPositive: '',
        keyPopTested: '',
        keyPopPositive: '',
        genPopPositivity: '',
        keyPopPositivity: '',
        totalTested: '',
        totalPositive: '',
        totalPercentage: '',
        missingPopTested: '',
        missingPopPositive: '',
        missingPopPositivity: ''
    });

    const loadUptakeByPopulationType = useCallback(async () => {
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
        const result = await getAll('hts/uptakeByPopulationType', params);
        let genPopVal = null;
        let keyPopVal = null;
        let missingPopVal = null;
        let genPopPositive = null;
        let keyPopPositive = null;
        let missingPopPositive = null;
        let genPopPositivity = null;
        let keyPopPositivity = null;
        let missingPopPositivity = null;
        for(let i = 0; i < result.length; i++) {
            if(result[i].PopulationType === 'Key Population') {
                keyPopVal = parseInt(result[i].Tested, 10);
                keyPopPositive = parseInt(result[i].positive, 10);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                genPopPositivity = val;
            } else if(result[i].PopulationType === 'General Population') {
                genPopVal = parseInt(result[i].Tested, 10);
                genPopPositive = parseInt(result[i].positive, 10);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                keyPopPositivity = val;
            } else if(result[i].PopulationType === null) {
                missingPopVal = parseInt(result[i].Tested, 10);
                missingPopPositive = parseInt(result[i].positive, 10);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                missingPopPositivity = val;
            }
        }
        setHtsOverview({
            genPopTested: genPopVal,
            keyPopTested: keyPopVal,
            missingPopTested: missingPopVal,
            genPopPositive: genPopPositive,
            keyPopPositive: keyPopPositive,
            missingPopPositive: missingPopPositive,
            genPopPositivity: genPopPositivity,
            keyPopPositivity: keyPopPositivity,
            missingPopPositivity: missingPopPositivity,
            totalTested: genPopVal + keyPopVal + missingPopVal,
            totalPositive: genPopPositive + keyPopPositive + missingPopPositive,
            totalPercentage: parseFloat(parseFloat(((genPopPositivity + keyPopPositivity + missingPopPositivity)/2)).toFixed(1))
        });
        setUptakeByPopulationType({
            title: { text: '' },
            plotOptions: { pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y:,.0f})'
                }
            }},
            series: [{ type: 'pie', colorByPoint: true, name: 'HIV Testing Services Uptake', data: [
                { name: 'General Population', y: genPopVal, color: "#1AB394" },
                { name: 'Key Population',  y: keyPopVal, color: "#2F4050", sliced: true, selected: true },
                // { name: 'Missing', y: missingPopVal, color: "#E06F07" }
            ]}]
        });
    }, [filters]);

    useEffect(() => {
        loadUptakeByPopulationType();
    }, [loadUptakeByPopulationType]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV TESTING SERVICES UPTAKE AND POSITIVITY POPULATION TYPE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="row">
                            <div className="col-6">
                                <HighchartsReact highcharts={Highcharts} options={uptakeByPopulationType} />
                            </div>
                            <div className="col-6" style={{backgroundColor: '#ffffff', padding: '3em' }}>
                                <table className="table table-bordered">
                                    <tbody>
                                    <tr><th>Type</th><th>Tested</th><th>Positive</th><th>%</th></tr>
                                    <tr><td>General Population</td><td align="right">{htsOverview.genPopTested}</td><td align="right">{htsOverview.genPopPositive}</td><td align="right">{htsOverview.genPopPositivity} % </td></tr>
                                    <tr><td>Key Population</td><td align="right">{htsOverview.keyPopTested}</td><td align="right">{htsOverview.keyPopPositive}</td><td align="right">{htsOverview.keyPopPositivity} % </td></tr>
                                    {/* <tr><td>Missing</td><td align="right">{htsOverview.missingPopTested}</td><td align="right">{htsOverview.missingPopPositive}</td><td align="right">{htsOverview.missingPopPositivity} % </td></tr> */}
                                    <tr><td>Total</td><td align="right">{htsOverview.totalTested}</td><td align="right">{htsOverview.totalPositive}</td><td align="right">{htsOverview.totalPercentage} % </td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeByPopulationType;
