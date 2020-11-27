import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const AdverseEventsSeverity = () => {
    const filters = useSelector(state => state.filters);
    const [severityGrading, setSeverityGrading] = useState({});
    const [adverseEventsActionsBySeverity, setAdverseEventsActionsBySeverity] = useState({});
    const [totalAdverseEventsActions, setTotalAdverseEventsActions] = useState({
        total: ''
    });

    const loadSeverityGrading =  useCallback(async () => {
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
        let mildVal = 0;
        let moderateVal = 0;
        let severeVal = 0;
        let noneVal = 0;
        let unknownVal = 0;
        let notindictatedVal = 0;

        const result = await getAll('care-treatment/getAeSeverityGrading', params);
        const mild = result.filter(obj => obj.Severity === "Mild");
        const moderate = result.filter(obj => obj.Severity === "Moderate");
        const severe = result.filter(obj => obj.Severity === "Severe");
        const none = result.filter(obj => obj.Severity === "None");
        const unknown = result.filter(obj => obj.Severity === "Unknown");

        if (mild.length > 0) {
            mildVal = mild[0].total;
        }

        if (moderate.length > 0) {
            moderateVal = moderate[0].total;
        }

        if (severe.length > 0) {
            severeVal = severe[0].total;
        }

        if (none.length > 0) {
            noneVal = none[0].total;
        }

        if (unknown.length > 0) {
            unknownVal = unknown[0].total;
        }

        notindictatedVal = noneVal + unknownVal;

        setSeverityGrading({
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
                    name: 'SEVERITY GRADING OF AEs',
                    colorByPoint: true,
                    data: [
                    {
                        name: 'MILD',
                        y: mildVal,
                        color: "#1AB394"
                    },
                    {
                        name: 'SEVERE',
                        y: severeVal,
                        color: "#2F4050"
                    },
                    {
                        name: 'MODERATE',
                        y: moderateVal,
                        color: "#D4FF78"
                    },
                    {
                        name: 'NOT INDICATED',
                        y: notindictatedVal,
                        color: "#f28e2b"
                    }]
                }
            ]
        });
    }, [filters]);

    const loadAdverseEventsActionsBySeverity = useCallback(async () => {
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
        const result = await getAll('care-treatment/getAeActionsBySeverity', params);

        const undocumented = result.filter(obj => obj.AdverseEventActionTaken === 'Undocumented');
        const mild_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Mild') : [];
        const moderate_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Moderate') : [];
        const severe_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Severe') : [];
        const unknown_undocumented = undocumented.length > 0 ? undocumented.filter(obj => obj.Severity === 'Unknown') : [];
        const mild_undocumented_total = mild_undocumented.length > 0 ? mild_undocumented.map(item => item.total).reduce((i, j) => i + j) : 0;
        const moderate_undocumented_total = moderate_undocumented.length > 0 ? moderate_undocumented.map(item => item.total).reduce((j, k) => j + k) : 0;
        const severe_undocumented_total = severe_undocumented.length > 0 ? severe_undocumented.map(item => item.total).reduce((m, n) => m + n) : 0;
        const unknown_undocumented_total = unknown_undocumented.length > 0 ? unknown_undocumented.map(item => item.total).reduce((x, y) => x + y) : 0;

        const medicineNotChanged = result.filter(obj => obj.AdverseEventActionTaken === 'Medicine not changed');
        const mild_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Mild') : [];
        const moderate_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Moderate') : [];
        const severe_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Severe') : [];
        const unknown_medicineNotChanged = medicineNotChanged.length > 0 ? medicineNotChanged.filter(obj => obj.Severity === 'Unknown') : [];
        const mild_medicineNotChanged_total = mild_medicineNotChanged.length > 0 ? mild_medicineNotChanged.map(item => item.total).reduce((i, j) => i + j) : 0;
        const moderate_medicineNotChanged_total = moderate_medicineNotChanged.length > 0 ? moderate_medicineNotChanged.map(item => item.total).reduce((j, k) => j + k) : 0;
        const severe_medicineNotChanged_total = severe_medicineNotChanged.length > 0 ? severe_medicineNotChanged.map(item => item.total).reduce((m, n) => m + n) : 0;
        const unknown_medicineNotChanged_total = unknown_medicineNotChanged.length > 0 ? unknown_medicineNotChanged.map(item => item.total).reduce((x, y) => x + y) : 0;

        const doseReduced = result.filter(obj => obj.AdverseEventActionTaken === 'Dose reduced');
        const mild_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Mild') : [];
        const moderate_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Moderate') : [];
        const severe_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Severe') : [];
        const unknown_doseReduced = doseReduced.length > 0 ? doseReduced.filter(obj => obj.Severity === 'Unknown') : [];
        const mild_doseReduced_total = mild_doseReduced.length > 0 ? mild_doseReduced.map(item => item.total).reduce((i, j) => i + j) : 0;
        const moderate_doseReduced_total = moderate_doseReduced.length > 0 ? moderate_doseReduced.map(item => item.total).reduce((j, k) => j + k) : 0;
        const severe_doseReduced_total = severe_doseReduced.length > 0 ? severe_doseReduced.map(item => item.total).reduce((m, n) => m + n) : 0;
        const unknown_doseReduced_total = unknown_doseReduced.length > 0 ? unknown_doseReduced.map(item => item.total).reduce((x, y) => x + y) : 0;

        const medicineWithdrawn = result.filter(obj => obj.AdverseEventActionTaken === 'Medicine causing AE substituted/withdrawn');
        const mild_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Mild') : [];
        const moderate_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Moderate') : [];
        const severe_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Severe') : [];
        const unknown_medicine_withdrawn = medicineWithdrawn.length > 0 ? medicineWithdrawn.filter(obj => obj.Severity === 'Unknown') : [];
        const mild_medicine_withdrawn_total = mild_medicine_withdrawn.length > 0 ? mild_medicine_withdrawn.map(item => item.total).reduce((i, j) => i + j) : 0;
        const moderate_medicine_withdrawn_total = moderate_medicine_withdrawn.length > 0 ? moderate_medicine_withdrawn.map(item => item.total).reduce((j, k) => j + k) : 0;
        const severe_medicine_withdrawn_total = severe_medicine_withdrawn.length > 0 ? severe_medicine_withdrawn.map(item => item.total).reduce((m, n) => m + n) : 0;
        const unknown_medicine_withdrawn_total = unknown_medicine_withdrawn.length > 0 ? unknown_medicine_withdrawn.map(item => item.total).reduce((x, y) => x + y) : 0;

        const allDrugsStopped = result.filter(obj => obj.AdverseEventActionTaken === 'All drugs stopped');
        const mild_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Mild') : [];
        const moderate_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Moderate') : [];
        const severe_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Severe') : [];
        const unknown_allDrugsStopped = allDrugsStopped.length > 0 ? allDrugsStopped.filter(obj => obj.Severity === 'Unknown') : [];
        const mild_all_drugs_stopped_total = mild_allDrugsStopped.length > 0 ? mild_allDrugsStopped.map(item => item.total).reduce((i, j) => i + j) : 0;
        const moderate_all_drugs_stopped_total = moderate_allDrugsStopped.length > 0 ? moderate_allDrugsStopped.map(item => item.total).reduce((j, k) => j + k) : 0;
        const severe_all_drugs_stopped_total = severe_allDrugsStopped.length > 0 ? severe_allDrugsStopped.map(item => item.total).reduce((m, n) => m + n) : 0;
        const unknown_all_drugs_stopped_total = unknown_allDrugsStopped.length > 0 ? unknown_allDrugsStopped.map(item => item.total).reduce((x, y) => x + y) : 0;

        const n = result.length > 0 ? result.map(item => item.total).reduce((x, y) => x + y) : 0;

        setTotalAdverseEventsActions({
            total: n
        });

        setAdverseEventsActionsBySeverity({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['MILD', 'MODERATE', 'SEVERE', 'UNKNOWN']
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
                name: 'Undocumented',
                color: "#1AB394",
                data: [mild_undocumented_total, moderate_undocumented_total, severe_undocumented_total, unknown_undocumented_total]
            }, {
                name: 'Medicine not changed',
                color: "#485969",
                data: [mild_medicineNotChanged_total, moderate_medicineNotChanged_total, severe_medicineNotChanged_total, unknown_medicineNotChanged_total]
            }, {
                name: 'Dose reduced',
                color: "#D4FF78",
                data: [mild_doseReduced_total, moderate_doseReduced_total, severe_doseReduced_total, unknown_doseReduced_total]
            }, {
                name: 'Medicine causing AE withdrawn',
                color: "#1f77b4",
                data: [mild_medicine_withdrawn_total, moderate_medicine_withdrawn_total, severe_medicine_withdrawn_total, unknown_medicine_withdrawn_total]
            }, {
                name: 'All drugs stopped',
                color: "#f28e2b",
                data: [mild_all_drugs_stopped_total, moderate_all_drugs_stopped_total, severe_all_drugs_stopped_total, unknown_all_drugs_stopped_total]
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadSeverityGrading();
        loadAdverseEventsActionsBySeverity();
    }, [loadSeverityGrading, loadAdverseEventsActionsBySeverity]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SEVERITY GRADING OF AEs
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={severityGrading} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADVERSE EVENTS ACTIONS BY SEVERITY (N={totalAdverseEventsActions.total})
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={adverseEventsActionsBySeverity} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default AdverseEventsSeverity;
