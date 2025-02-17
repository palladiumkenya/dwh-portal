import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';


const ComparisonIndicatorNotesTxCurr = () => {

    return (
        <>
            <Card>
                <CardHeader className="covid-definition-header">
                    INDICATOR DEFINITIONS
                </CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            <strong>CURRENT ON ART:</strong> Number of adults and children currently receiving ART including those who have missed their appointment and 30 days have not passed since the last appointment.
                        </li>
                    </ul>
                    <span><i><strong>Indicator notes:</strong></i></span>
                    <ul>
                        <li>The indicator is computed and displayed for the last completed month.</li>
                        <li>Patients who have a visit date but do not have a next appointment date have 30 days added to their visit date to impute the expected appointment date.</li>
                        <li>This indicator is influenced by reporting rate (if a facility uploaded data to the data warehouse) and if uploaded database contains current patient visit and appointment data.</li>
                    </ul>
                </CardBody>
            </Card>
        </>
    )
}

export default ComparisonIndicatorNotesTxCurr;
