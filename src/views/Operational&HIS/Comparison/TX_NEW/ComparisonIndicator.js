import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';


const ComparisonIndicatorNotes = () => {

    return (
        <>
            <Card>
                <CardHeader className="covid-definition-header">
                    INDICATOR DEFINITIONS
                </CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            <strong>NEWLY STARTED ON ART:</strong> Number of patients who were started on ART within the previous month.
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </>
    )
}

export default ComparisonIndicatorNotes;
