import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const AdverseEventsCausesAndActionsByDrugs = () => {
    const filters = useSelector(state => state.filters);
    const [reportedCausesOfAEs, setReportedCausesOfAEs] = useState({});
    const [actionsByDrugs, setActionsByDrugs] = useState({});

    const loadReportedCausesOfAE = useCallback(async () => {
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
        const result = await getAll('care-treatment/getReportedCausesOfAes', params);
        const arvArray = result.filter(obj => obj.AdverseEventCause === 'ARV');
        const arvAndOthersArray = result.filter(obj => obj.AdverseEventCause === 'ARV + OTHER DRUGS');
        const non_arvArray = result.filter(obj => obj.AdverseEventCause === 'NON-ARVS');
        const unspecifiedArray = result.filter(obj => obj.AdverseEventCause === 'UNSPECIFIED');

        const arv = arvArray.length > 0 ? arvArray[0].total : 0;
        const arvAndOthers = arvAndOthersArray.length > 0 ? arvAndOthersArray[0].total : 0;
        const non_arv = non_arvArray.length > 0 ? non_arvArray[0].total : 0;
        const unspecified = unspecifiedArray.length > 0 ? unspecifiedArray[0].total : 0;

        setReportedCausesOfAEs({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y})'
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'Number of Patients',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'ARV',
                            y: arv,
                            color: "#1AB394"
                        },
                        {
                            name: 'NON-ARVs',
                            y: non_arv,
                            color: "#2F4050"
                        },
                        {
                            name: 'ARV + OTHER DRUGS',
                            y: arvAndOthers,
                            color: "#1f77b4"
                        },
                        {
                            name: 'UNSPECIFIED CATEGORY',
                            y: unspecified,
                            color: "#D4FF78"
                        }]
                }
            ]
        });
    }, [filters]);

    const loadActionsByDrugs = useCallback(async () => {
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
        const categories = [];
        const result = await getAll('care-treatment/getAeActionsByDrugs', params);

        for (let i = 0; i < result.length; i++) {
            if (!categories.includes(result[i].AdverseEventCause)) {
                categories.push(result[i].AdverseEventCause);
            }
        }
        const severeVals = [];
        const moderateVals = [];
        const mildVals = [];
        const undocumentedVals = [];
        for (let i = 0; i < categories.length; i++) {
            const categoryVals =  result.filter(obj => obj.AdverseEventCause === categories[i]);
            //Severe
            const severeVal = categoryVals.filter(x => x.Severity === 'Severe');
            const sumSevere = severeVal.length > 0 ? severeVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            severeVals.push(sumSevere);
            //Moderate
            const moderateVal = categoryVals.filter(x => x.Severity === 'Moderate');
            const sumModerate = moderateVal.length > 0 ? moderateVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            moderateVals.push(sumModerate);
            //Mild
            const mildVal = categoryVals.filter(x => x.Severity === 'Mild');
            const sumMild = mildVal.length > 0 ? mildVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            mildVals.push(sumMild);
            //Undocumented
            const undocumentedVal = categoryVals.filter(x => x.Severity === 'Undocumented');
            const sumundocumented = undocumentedVal.length > 0 ? undocumentedVal.map(item => item.total).reduce((x, y) => x + y) : 0;
            undocumentedVals.push(sumundocumented);
        }

        setActionsByDrugs({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT OF PATIENTS'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'SEVERE',
                color: "#485969",
                data: severeVals
            }, {
                name: 'MODERATE',
                color: "#1AB394",
                data: moderateVals
            }, {
                name: 'MILD',
                color: "#1f77b4",
                data: mildVals
            }, {
                name: 'UNDOCUMENTED',
                color: '',
                data: undocumentedVals
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadReportedCausesOfAE();
        loadActionsByDrugs();
    }, [loadReportedCausesOfAE, loadActionsByDrugs]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        REPORTED CAUSES OF AEs
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={reportedCausesOfAEs} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADVERSE EVENTS ACTIONS BY DRUGS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={actionsByDrugs} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
export default AdverseEventsCausesAndActionsByDrugs;

