import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { formatNumber } from './../../../utils/utils';
import { useSelector } from 'react-redux';

import * as adverseEventsSeverityActionsSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsSeverityActions';

const AdverseEventsSeverityActions = ({ tab }) => {
    const [adverseEventsActionsBySeverity, setAdverseEventsActionsBySeverity] = useState({});
    const methodCalled = tab === 'adult' ? adverseEventsSeverityActionsSelectors.getAdverseEventsSeverityActions : adverseEventsSeverityActionsSelectors.getAdverseEventsSeverityCalHIVActions;
    const adverseEventsSeverityActions = useSelector(methodCalled);
    const n = parseInt(adverseEventsSeverityActions.mild_medicineNotChanged_total) +
        parseInt(adverseEventsSeverityActions.moderate_medicineNotChanged_total) +
        parseInt(adverseEventsSeverityActions.severe_medicineNotChanged_total) +
        parseInt(adverseEventsSeverityActions.unknown_medicineNotChanged_total) +
        parseInt(adverseEventsSeverityActions.mild_doseReduced_total) +
        parseInt(adverseEventsSeverityActions.moderate_doseReduced_total) +
        parseInt(adverseEventsSeverityActions.severe_doseReduced_total) +
        parseInt(adverseEventsSeverityActions.unknown_doseReduced_total) +
        parseInt(adverseEventsSeverityActions.mild_medicine_withdrawn_total) +
        parseInt(adverseEventsSeverityActions.moderate_medicine_withdrawn_total) +
        parseInt(adverseEventsSeverityActions.severe_medicine_withdrawn_total) +
        parseInt(adverseEventsSeverityActions.unknown_medicine_withdrawn_total) +
        parseInt(adverseEventsSeverityActions.mild_all_drugs_stopped_total) +
        parseInt(adverseEventsSeverityActions.moderate_all_drugs_stopped_total) +
        parseInt(adverseEventsSeverityActions.severe_all_drugs_stopped_total) +
        parseInt(adverseEventsSeverityActions.unknown_all_drugs_stopped_total) +
        parseInt(adverseEventsSeverityActions.mild_undocumented_total) +
        parseInt(adverseEventsSeverityActions.moderate_undocumented_total) +
        parseInt(adverseEventsSeverityActions.severe_undocumented_total) +
        parseInt(adverseEventsSeverityActions.unknown_undocumented_total);

    const loadAdverseEventsActionsBySeverity = useCallback(async () => {
        setAdverseEventsActionsBySeverity({
            title: { text: '' },
            xAxis: [{ categories: ['MILD', 'MODERATE', 'SEVERE', 'UNKNOWN'], crosshair: true}],
            yAxis: [{ title: { text: 'Number of Patients' }, stackLabels: { enabled: true, style: { fontWeight: 'bold', color: "#808080" }}}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: { shared: true, headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
            plotOptions: { column: { stacking: 'normal'}},
            series: [{
                data: [
                    adverseEventsSeverityActions.mild_medicineNotChanged_total,
                    adverseEventsSeverityActions.moderate_medicineNotChanged_total,
                    adverseEventsSeverityActions.severe_medicineNotChanged_total,
                    adverseEventsSeverityActions.unknown_medicineNotChanged_total
                ], name: 'Medicine not changed', type: 'column', color: "#485969",
            }, {
                data: [
                    adverseEventsSeverityActions.mild_doseReduced_total,
                    adverseEventsSeverityActions.moderate_doseReduced_total,
                    adverseEventsSeverityActions.severe_doseReduced_total,
                    adverseEventsSeverityActions.unknown_doseReduced_total
                ], name: 'Dose reduced', type: 'column', color: "#D4FF78",
            }, {
                data: [
                    adverseEventsSeverityActions.mild_medicine_withdrawn_total,
                    adverseEventsSeverityActions.moderate_medicine_withdrawn_total,
                    adverseEventsSeverityActions.severe_medicine_withdrawn_total,
                    adverseEventsSeverityActions.unknown_medicine_withdrawn_total
                ], name: 'Medicine causing AE withdrawn', type: 'column', color: "#1f77b4",
            }, {
                data: [
                    adverseEventsSeverityActions.mild_all_drugs_stopped_total,
                    adverseEventsSeverityActions.moderate_all_drugs_stopped_total,
                    adverseEventsSeverityActions.severe_all_drugs_stopped_total,
                    adverseEventsSeverityActions.unknown_all_drugs_stopped_total
                ], name: 'All drugs stopped', type: 'column', color: "#f28e2b",
            }, {
                data: [
                    adverseEventsSeverityActions.mild_undocumented_total,
                    adverseEventsSeverityActions.moderate_undocumented_total,
                    adverseEventsSeverityActions.severe_undocumented_total,
                    adverseEventsSeverityActions.unknown_undocumented_total
                ], name: 'Undocumented', type: 'column', color: "#1AB394",
            }]
        });
    }, [adverseEventsSeverityActions]);

    useEffect(() => {
        loadAdverseEventsActionsBySeverity();
    }, [loadAdverseEventsActionsBySeverity]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                ADVERSE EVENTS ACTIONS FOR ADULTS 15+ WHO DEVELOPED AEs
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={adverseEventsActionsBySeverity} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsSeverityActions;
