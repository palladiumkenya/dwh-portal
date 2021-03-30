import { Card, CardBody, CardHeader } from 'reactstrap';
import React from 'react';
import moment from 'moment';

const RRIndicatorDefinition = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    const previousMonthDate = moment(today).subtract(1, 'months').toDate();
    const previousMonth = new Date(previousMonthDate).toLocaleString('default', { month: 'long' });
    const twoMonthsBackDate = moment(today).subtract(2, 'months').toDate();
    const twoMonthsBackMonth = new Date(twoMonthsBackDate).toLocaleString('default', { month: 'long' });

    return (
        <div className={"row"}>
            <div className="col-12">
                <Card>
                    <CardHeader className={"indicator_definition_header"}>
                        Indicator Definitions
                    </CardHeader>
                    <CardBody className={"indicator_definition_body"}>
                        <ul>
                            <li className={"indicator_word_wrap"}>
                                Consistency of reporting = The proportion of EMR sites that submitted a report every month to the data warehouse within the preceding 3 months. i.e.,
                                The consistency of reporting in {month} {year} is the proportion of EMR facilities that submitted each report to the NDW in {twoMonthsBackMonth}, {previousMonth} and {month} {year}.
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RRIndicatorDefinition;

