import SectionFooter from '../Shared/SectionFooter';
import moment from 'moment/moment';
import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Shared/Loading';
import { LOADING_DELAY } from '../../constants';
const RROverview = Loadable({ loader: () => import('./RROverview'), loading: Loading, delay: LOADING_DELAY });
const RROverviewTrends = Loadable({ loader: () => import('./RROverviewTrends'), loading: Loading, delay: LOADING_DELAY });
const RRCounty = Loadable({ loader: () => import('./RRCounty'), loading: Loading, delay: LOADING_DELAY });
const RRPartner = Loadable({ loader: () => import('./RRPartner'), loading: Loading, delay: LOADING_DELAY });
const RRIndicatorDefinition = Loadable({ loader: () => import('./RRIndicatorDefinition'), loading: Loading, delay: LOADING_DELAY });

const RRTab = () => {

    return (
        <div>
            <RRIndicatorDefinition />
            <RROverview/>
            <RROverviewTrends/>
            <SectionFooter overview={"The Overall reporting rates refers to the proportion of EMR sites that submitted the most recent i.e. The "+ moment().format('MMMM, YYYY') + " Overall reporting rates in the number of EMR sites that uploaded data to the NDW in " + moment().format('MMMM, YYYY') + " and so forth."} />
            {/*<SectionHeader title="REPORTING RATES" description="BY COUNTY"/>*/}
            <RRCounty/>
            <SectionFooter overview={"The overall reporting rate for "+ moment().format('MMMM, YYYY') +" is the number of EMR sites that uploaded data in "+ moment().format('MMMM, YYYY') } />
            {/*<SectionHeader title="REPORTING RATES" description="BY PARTNER"/>*/}
            <RRPartner/>
            <SectionFooter overview={'The overall reporting rate for ' + moment().format('MMMM, YYYY') +",is the number of EMR sites that uploaded data in " + moment().format('MMMM, YYYY') } />
        </div>
    )
}

export default RRTab
