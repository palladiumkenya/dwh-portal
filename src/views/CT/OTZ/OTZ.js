import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import VisibilitySensor from 'react-visibility-sensor';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useParams } from 'react-router-dom';

const OTZOverview = Loadable({ loader: () => import('./OTZOverview'), loading: Loading, delay: LOADING_DELAY });
const OTZTabs = Loadable({ loader: () => import('./OTZTabs'), loading: Loading, delay: LOADING_DELAY });

const OTZ = () => {
    const branding = { title: "OTZ", description: "OVERVIEW", overview: "OTZ" };
    const [activeTab, setActiveTab] = useState('otz');
    const { active_tab } = useParams();
    const ctTab = active_tab
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'otz') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>Adolescents Current on ART =&gt; Number of adolescents currently receiving ART including those who have missed their appointment and 30 days have not passed since the last missed appointment.</li>
                        <li>
                            Valid Viral Load =&gt; Adolescents on OTZ (10-24 years) current on treatment for more than 6 months and have a viral load result whose sample was taken within the last 14 months of the latest visit.
                        </li>
                        <li>
                            Virally suppressed =&gt; Adolescents on OTZ (10-24 years) who are current on treatment with valid viral load results of &#60;1000 copies/ml.
                        </li>
                        <li>
                            High Viral Load (HVL) =&gt; Adolescents on OTZ (10-24 years)  who are current on treatment with valid viral load results of &#8805;1,000 copies/ml.
                        </li>
                        <li>
                            Completed Training: Computed as having completed 7 out of 8 of the modules:OTZ_Orientation,OTZ_Participation,OTZ_MakingDecisions,OTZ_Transition,OTZ_Leadership,OTZ_TreatmentLiteracy,OTZ_SRH,OTZ_Beyond
                        </li>
                    </ul>
                </CardBody>
            </Card>
            <OTZOverview />
            <OTZTabs />
        </div>
    );
}

export default OTZ;
