import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import DSDHeader from './DSDHeader';
import DSDFooter from './DSDFooter';
import DSDCascade from './DSDCascade';
import DistributionUnstable from './DistributionUnstable';
import DistributionMMDStable from './DistributionMMDStable';
import DistributionStableAgeSex from './DistributionStableAgeSex';
import DistributionStableByCounty from './DistributionStableByCounty';
import DistributionStableByPartner from './DistributionStableByPartner';
import AppointmentDurationByStability from './AppointmentDurationByStability';
import AppointmentDurationBySex from './AppointmentDurationBySex';
import AppointmentDurationByAge from './AppointmentDurationByAge';
import AppointmentDurationStableByCounty from './AppointmentDurationStableByCounty';
import AppointmentDurationStableByPartner from './AppointmentDurationStableByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";

const DSD = () => {
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'dsd') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <DSDHeader></DSDHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DSDCascade />
                </div>
                <div className="col-6">
                    <DistributionUnstable />
                </div>
            </div>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DistributionMMDStable />
                </div>
                <div className="col-6">
                    <DistributionStableAgeSex />
                </div>
            </div>
            <p></p><DistributionStableByCounty />
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><DistributionStableByPartner />
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <AppointmentDurationByStability />
                </div>
                <div className="col-6">
                    <AppointmentDurationBySex />
                </div>
            </div>
            <p></p><AppointmentDurationByAge />
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><AppointmentDurationStableByCounty />
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><AppointmentDurationStableByPartner />
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            
        </div>
    );

};

export default DSD;
