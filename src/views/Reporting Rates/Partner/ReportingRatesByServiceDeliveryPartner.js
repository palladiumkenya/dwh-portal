import React, { Component } from "react";
import ServiceDeliveryPartnerHeader from "./ServiceDeliveryPartnerHeader";
import Filter from "../../Shared/Filter";
import ServiceDeliveryPartnerFooter from "./ServiceDeliveryPartnerFooter";
import ServiceDeliveryPartnerReports from "./ServiceDeliveryPartnerReports";

export class ReportingRatesByServiceDeliveryPartner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ServiceDeliveryPartnerHeader></ServiceDeliveryPartnerHeader>

                <Filter></Filter>

                <ServiceDeliveryPartnerReports></ServiceDeliveryPartnerReports>

                <hr />
                <ServiceDeliveryPartnerFooter></ServiceDeliveryPartnerFooter>
                <hr />
            </div>
        );
    }
}

export default ReportingRatesByServiceDeliveryPartner;
