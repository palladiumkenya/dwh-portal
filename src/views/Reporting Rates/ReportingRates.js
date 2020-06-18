import React, { Component, useState } from 'react';
import ReportingRatesOverview from './Overview/ReportingRatesOverview';
import ReportingRatesByCounty from './County/ReportingRatesByCounty';
import ReportingRatesByServiceDeliveryPartner from './Partner/ReportingRatesByServiceDeliveryPartner';

const ReportingRates = () => {

    return (
        <div className="animated fadeIn">
            <div className="strip"></div>

            <ReportingRatesOverview></ReportingRatesOverview>

            <div className="strip"></div>

            <ReportingRatesByCounty></ReportingRatesByCounty>

            <div className="strip"></div>

            <ReportingRatesByServiceDeliveryPartner></ReportingRatesByServiceDeliveryPartner>
        </div>
    );

};

export default ReportingRates;
