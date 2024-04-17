import { Card, CardBody, CardHeader } from 'reactstrap';
import React from 'react';
import moment from 'moment';
import { ETL_DAY } from '../../constants';

const RRIndicatorDefinition = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = moment().subtract(2, 'month').add(ETL_DAY, 'days').format('MMMM');
    const previousMonthDate = moment().subtract(3, 'month').add(ETL_DAY, 'days');
    const previousMonth = new Date(previousMonthDate).toLocaleString(
        'default',
        { month: 'long' }
    );
    const twoMonthsBackDate = moment().subtract(4, 'month').add(ETL_DAY, 'days');
    const twoMonthsBackMonth = new Date(twoMonthsBackDate).toLocaleString(
        'default',
        { month: 'long' }
    );

    return (
        <div className={'row'}>
            <div className="col-12">
                <Card>
                    <CardHeader className={'indicator_definition_header'}>
                        Indicator Definitions
                    </CardHeader>
                    <CardBody className={'indicator_definition_body'}>
                        <ul>
                            <li className={'indicator_word_wrap'}>
                                Expected Uploads: The number EMR sites that are
                                anticipated to send an upload.
                            </li>
                            <li className={'indicator_word_wrap'}>
                                Overall Reporting Rates: The proportion of EMR
                                sites that sent uploads in a given month.
                            </li>
                            <li className={'indicator_word_wrap'}>
                                Consistency of reporting: The proportion of EMR
                                sites that submitted a report every month to the
                                data warehouse within the preceding 3 months.
                                i.e., The consistency of reporting in {month}{' '}
                                {year} is the proportion of EMR facilities that
                                submitted each report to the NDW in{' '}
                                {twoMonthsBackMonth}, {previousMonth} and{' '}
                                {month} {year}.
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RRIndicatorDefinition;
