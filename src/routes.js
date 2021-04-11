import React from 'react';
import withTracker from './withTracker';

const Home = React.lazy(() => import('./views/Home/Home'));
const RR = React.lazy(() => import('./views/RR/RR'));
const HTS = React.lazy(() => import('./views/HTS/HTS'));
const CT = React.lazy(() => import("./views/CT/CT"));
const GIS = React.lazy(() => import("./views/GIS/GIS"));
const HRH = React.lazy(() => import("./views/HRH/HRH"));
const Resources = React.lazy(() => import('./views/Resources/Resources'));
const Organizations = React.lazy(() => import('./views/Administration/Organizations/Organizations'));
const Profile = React.lazy(() => import('./views/Users/Profile'));

const routes = [
  { path: "/", exact: true, name: "Home", component: withTracker(Home), private: false },
  { path: "/reporting-rates", exact: true, name: "Reporting Rates", component: withTracker(RR), private: false },
  { path: "/hiv-testing", exact: true, name: 'HIV Testing & Prevention', component: withTracker(HTS), private: false },
  { path: "/hiv-treatment", exact: true, name: "HIV Treatment", component: withTracker(CT), private: false },
  { path: "/gis", exact: true, name: "GIS", component: withTracker(GIS), private: false },
  { path: "/hrh", exact: true, name: "HRH", component: withTracker(HRH), private: false },
  { path: "/resources", exact: true, name: "Resources", component: withTracker(Resources), private: false },
  { path: '/administration/organizations', exact: true, name: "Organizations", component: withTracker(Organizations), private: true },
  { path: '/users/profile', exact: true, name: "Profile", component: withTracker(Profile), private: true }
];

export default routes;
