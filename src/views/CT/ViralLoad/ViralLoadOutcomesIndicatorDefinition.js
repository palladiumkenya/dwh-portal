import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const ViralLoadOutcomesIndicatorDefinition = () => {
    return (
        <Card>
            <CardHeader>Indicator Definition</CardHeader>
            <CardBody>
                <ul>
                    <li>Virally suppressed =&gt; Patients who are current on treatment with valid viral load results of &#60;400 copies/ml</li>
                    <li>Low Level Viremia =&gt; Patients who are current on treatment with valid viral load results of 400 – 999 copies/ml</li>
                    <li>High Viral Load =&gt; Patients who are current on treatment with valid viral load results of ≥1,000 copies/ml</li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default ViralLoadOutcomesIndicatorDefinition;
