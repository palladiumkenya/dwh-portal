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
                            <strong>HTS TESTED &#10132; </strong> Number of
                            adults and children who have been tested for HIV and
                            have given their results within the reporting
                            period.
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </>
    );
}

export default ComparisonIndicatorNotes;
