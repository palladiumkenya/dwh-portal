import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageByPopulationType = () => {
    const filters = useSelector(state => state.filters);
    const [linkageByPopulationType, setLinkageByPopulationType] = useState({});
    const [linkage, setLinkage] = useState({
        genPopPositive: '',
        keyPopPositive: '',
        missingPopPositive: '',
        genPopLinked: '',
        keyPopLinked: '',
        missingPopLinked: '',
        genPopLinkage: '',
        keyPopLinkage: '',
        missingPopLinkage: '',
    });

    const loadLinkageByPopulationType = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):""
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/linkageByPopulationType', params);
        let genPopPositive = null;
        let keyPopPositive = null;
        let genPopLinked = null;
        let keyPopLinked = null;
        let genPopLinkage = null;
        let keyPopLinkage = null;
        let missingPopPositive = 0.0;
        let missingPopLinked = 0.0;
        let missingPopLinkage = 0.0;
        for(let i = 0; i < result.length; i++) {
            if(result[i].PopulationType === 'Key Population') {
                keyPopPositive = parseInt(result[i].positive, 10);
                keyPopLinked = parseInt(result[i].linked, 10);
                keyPopLinkage = Number(parseFloat(result[i].linkage).toFixed(1));
            } else if(result[i].PopulationType === 'General Population') {
                genPopPositive = parseInt(result[i].positive, 10);
                genPopLinked = parseInt(result[i].linked, 10);
                genPopLinkage = Number(parseFloat(result[i].linkage).toFixed(1));
            } else if(!result[i].PopulationType || result[i].PopulationType === null || result[i].PopulationType === '') {
                missingPopPositive = parseInt(result[i].positive, 10);
                missingPopLinked = parseInt(result[i].linked, 10);
                missingPopLinkage = Number(parseFloat(result[i].linkage).toFixed(1));
            }
        }
        setLinkage({
            genPopPositive: genPopPositive,
            keyPopPositive: keyPopPositive,
            missingPopPositive: missingPopPositive,
            genPopLinked: genPopLinked,
            keyPopLinked: keyPopLinked,
            missingPopLinked: missingPopLinked,
            genPopLinkage: genPopLinkage,
            keyPopLinkage: keyPopLinkage,
            missingPopLinkage: missingPopLinkage,
        });
        setLinkageByPopulationType({
            title: { text: '', },
            xAxis: [{ categories: ['Key Population', 'General Population'], crosshair: true }],
            yAxis: [
                { title: { text: 'Percentage Linkage' }, labels: { format: '{value} %' } },
            ],
            tooltip: { formatter: function () {
                return this.point.category + ': <b>' +
                    Highcharts.numberFormat(Math.abs(this.point.absoluteY), 0) + '</b>';
            }},
            plotOptions: { column: { dataLabels: { enabled: true, format: '<b>{point.y:,.0f} %</b>' } } },
            legend: { enabled: false },
            series: [{ name: 'Percentage Linkage', type: 'column', tooltip: { valueSuffix: ' %' } , data: [
                { name: 'Key Population',  y: Number(((keyPopLinked/(genPopLinked + keyPopLinked + missingPopLinked))*100).toFixed(0)), absoluteY:keyPopLinked, color: "#2F4050"},
                { name: 'General Population', y: Number(((genPopLinked/(genPopLinked + keyPopLinked + missingPopLinked))*100).toFixed(0)), absoluteY:genPopLinked, color: "#1AB394" },
                // { name: 'Missing', y: missingPopLinked, color: "#E06F07" }
            ]}]
        });
    }, [filters]);

    useEffect(() => {
        loadLinkageByPopulationType();
    }, [loadLinkageByPopulationType]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HTS LINKAGE BY POPULATION TYPE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="row">
                            <div className="col-6">
                                <HighchartsReact highcharts={Highcharts} options={linkageByPopulationType} />
                            </div>
                            <div className="col-6" style={{backgroundColor: '#ffffff', padding: '3em' }}>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr><th>Type</th><th>Positive</th><th>Linked</th><th>%</th></tr>
                                        <tr><td>General Population</td><td align="right">{linkage.genPopPositive}</td><td align="right">{linkage.genPopLinked}</td><td align="right">{parseFloat(linkage.genPopLinkage).toFixed(1)} % </td></tr>
                                        <tr><td>Key Population</td><td align="right">{linkage.keyPopPositive}</td><td align="right">{linkage.keyPopLinked}</td><td align="right">{parseFloat(linkage.keyPopLinkage).toFixed(1)} % </td></tr>
                                        {/* <tr><td>Missing</td><td align="right">{linkage.missingPopPositive}</td><td align="right">{linkage.missingPopLinked}</td><td align="right">{parseFloat(linkage.missingPopLinkage).toFixed(1)} % </td></tr> */}
                                        <tr><td>Total</td><td align="right">{linkage.genPopPositive + linkage.keyPopPositive}</td><td align="right">{linkage.genPopLinked + linkage.keyPopLinked}</td><td align="right">{((linkage.genPopLinkage + linkage.keyPopLinkage)/2).toFixed(1)} % </td></tr>
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

export default LinkageByPopulationType;
