import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const ViralLoadUptakeIndicatorDefinition = () => {
    return (
        <Card>
            <CardHeader>Indicator Definition</CardHeader>
            <CardBody>
                <ul>
                    <li>Eligible for Viral Load =&gt; Patients who are current on treatment for more than 6 months</li>
                    <li>Valid Viral Load =&gt; Patients who are current on treatment for more than 6 months and have a viral load result whose sample was taken within the last 14 months of the latest visit.</li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default ViralLoadUptakeIndicatorDefinition;
