import React, {  } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const HtsUptakeIndicatorDefinition = () => {
    return (
        <div className={"row"}>
            <div className="col-12">
                <Card>
                    <CardHeader>Indicator Definition</CardHeader>
                    <CardBody>
                        <ul>
                            <li>HIV Testing Services (HTS) Uptake =&gt; Number of unique individuals who are tested for HIV within a reporting period. This is based on the documented final result in eHTS.</li>
                            <li>Positivity =&gt; Number of unique individuals whose HIV test results are positive divided by the number of unique individuals tested for HIV.</li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default HtsUptakeIndicatorDefinition;
