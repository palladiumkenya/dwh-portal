import React, { useEffect } from 'react';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { Card, CardBody, CardHeader } from 'reactstrap';
import SectionFooter from '../../Shared/SectionFooter';


const PercentARTPatientsWithGoodQualityData = Loadable({
    loader: () => import('./PercentARTPatientsWithGoodQualityData'),
    loading: Loading,
    delay: LOADING_DELAY
});
const DQAOverview = Loadable({ loader: () => import('./DQAOverview'), loading: Loading, delay: LOADING_DELAY });

const DataQualityAssessment = () => {
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());

        }
    };
    return (
        <>
            <SectionHeader
                title={'DATA QUALITY ASSESSMENT'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <br/>
            <h5><strong>Accuracy:</strong> Measure whether the data elements conform to specified ranges of predefined
                values.</h5>
            <br/>
            <DQAOverview/>
            <Card>
                <CardHeader className="covid-definition-header">ELEMENTS CHECKED FOR DATA QUALITY</CardHeader>
                <CardBody>
                    <ul>
                        <li><strong>Visit Type:</strong> Specify if the visit was self or Treatment supporter this will
                            help explain 'No' where the visit was not self.
                        </li>
                        <li><strong>CCC NO:</strong> The CCC number must be 10 digits (5 for MFL Code followed by 5 for
                            serial number.
                        </li>
                        <li><strong>Date of Birth:</strong> The D.O.B must be complete i.e., includes day, month, and
                            year (dd/mm/yyyy).
                        </li>
                        <li><strong>Sex:</strong> The sex of the client, either Male or Female.</li>
                        <li><strong>Current ART regimen (Last Visit):</strong> The regimen as of last visit.</li>
                        <li><strong>Drug dosage given (Duration):</strong> The number of days or months for which drugs
                            were dispensed during the last visit.
                        </li>
                        <li><strong>Weight (kgs):</strong> The weight of client in kilograms as per last visit.</li>
                        <li><strong>Height (cms):</strong> The height of client in centimeters per last visit.</li>
                        <li><strong>TPT/IPT initiated:</strong> If the client has ever been initiated on IPT/TPT.</li>
                        <li><strong>Nutrition Assessment Done:</strong> The nutritional status of the client as per last
                            visit.
                        </li>
                        <li><strong>DSD model:</strong> The differentiated care model in which the client was
                            categorized as per last visit.
                        </li>
                        <li><strong>Last latest valid VL result documented:</strong> A VL within 12 months.</li>
                        <li><strong>Date of last appointment:</strong> The last visit date in dd/mm/yyyy format.</li>
                    </ul>
                </CardBody>
            </Card>
            <SectionFooter overview={'Data Quality Assessment'}/>
            <PercentARTPatientsWithGoodQualityData/>
            <SectionFooter overview={'Data Quality Assessment'}/>

        </>
    );
};


export default DataQualityAssessment;
