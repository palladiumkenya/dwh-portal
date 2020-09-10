import CareTreatment from './views/CT/CareTreatment';
import HIVTreatmentOverview from "./views/CT/HIVTreatmentOverview";
import HRH from "./views/HRH/HRH";
import HtsLinkage from './views/HTS/HtsLinkage';
import HtsUptake from './views/HTS/HtsUptake';
import ReportingRates from './views/ReportingRates/ReportingRates';

const routes = [
  { path: "/", exact: true, name: "Home", component: CareTreatment },
  { path: "/hiv-treatment", exact: true, name: "HIV Treatment", component: HIVTreatmentOverview, },
  { path: "/hrh", exact: true, name: "HRH", component: HRH, },
  { path: "/hts/hts-linkage", exact: true, name: 'HTS Linkage', component: HtsLinkage },
  { path: "/hts/hts-uptake", exact: true, name: 'HTS Uptake', component: HtsUptake },
  { path: "/reporting-rates", exact: true, name: "Reporting Rates", component: ReportingRates, },
];

export default routes;
