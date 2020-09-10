import HIVTreatmentOverview from "./views/CT/HIVTreatmentOverview";
import CareTreatment from './views/CT/CareTreatment';
import HRH from "./views/HRH/HRH";
import HtsOverview from './views/Hts Overview/HtsOverview';
import HtsPositivityLinkage from './views/Hts Overview/HtsPositivityLinkage';
import ReportingRates from "./views/Reporting Rates/ReportingRates";

const routes = [
  { path: "/", exact: true, name: "Care & Treatment", component: CareTreatment },
  { path: "/hiv-treatment", exact: true, name: "HIV Treatment", component: HIVTreatmentOverview, },
  { path: "/hrh", exact: true, name: "HRH", component: HRH, },
  { path: "/hts/hts-linkage", exact: true, name: 'HTS Linkage', component: HtsPositivityLinkage },
  { path: "/hts/hts-overview", exact: true, name: 'HTS Uptake', component: HtsOverview },
  { path: "/reporting-rates", exact: true, name: "Reporting Rates", component: ReportingRates, },
];

export default routes;
