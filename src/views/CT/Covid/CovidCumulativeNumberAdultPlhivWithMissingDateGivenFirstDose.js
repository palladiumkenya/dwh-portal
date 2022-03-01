import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';

import * as covidCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose
    from '../../../selectors/CT/Covid/covidCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose';
import { formatNumber } from '../../../utils/utils';


const COVIDCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose = () => {
    const [covidMissingDateGivenFirstDose, setCovidMissingDateGivenFirstDose] = useState({});
    const missingDateGivenFirstDose = useSelector(covidCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose.getCumulativeNumberAdultsWithMissingDateGivenFirstDose).cumulative;


    const loadMissingDateGivenFirstDose = useCallback(async () => {
        setCovidMissingDateGivenFirstDose(missingDateGivenFirstDose);
    }, [missingDateGivenFirstDose]);


    useEffect(() => {
        loadMissingDateGivenFirstDose();
    }, [loadMissingDateGivenFirstDose]);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <CardHeader className="expected-uploads-header">
                            CUMULATIVE NUMBER OF PLHIV WITH MISSING DATE GIVEN FIRST DOSE OF COVID - 19 VACCINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center justify-content-center"
                            style={{ height: '100px' }}
                        >
                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <span style={{
                                    fontFamily: 'Nunito',
                                    fontSize: '60px',
                                    lineHeight: '59px',
                                    alignItems: 'center',
                                    color: '#000000'
                                }}>{formatNumber(missingDateGivenFirstDose)}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default COVIDCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose;
