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
                            <strong>HTS POS &#10132; </strong> Number of
                            adults and children who recived HIV testing 
                            services and received their test results as 
                            positive.
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </>
    );
}

export default ComparisonIndicatorNotes;
