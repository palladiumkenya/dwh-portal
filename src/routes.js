import Loadable from 'react-loadable';
import withTracker from './withTracker';
import Loading from './views/Shared/Loading';
import { LOADING_DELAY } from './constants';

const Home = Loadable({
    loader: () => import('./views/Home/Home'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const RR = Loadable({
    loader: () => import('./views/RR/RR'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const HTS = Loadable({
    loader: () => import('./views/HTS/HTS'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const CT = Loadable({
    loader: () => import('./views/CT/CT'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const SD = Loadable({
    loader: () => import('./views/ServiceDesk/ServiceDesk'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OperationalHIS = Loadable({
    loader: () => import('./views/Operational&HIS/OperationalHIS'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PMTCTRRI = Loadable({
    loader: () => import('./views/PMTCTRRI/PMTCTRRI'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const GIS = Loadable({
    loader: () => import('./views/GIS/GIS'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const HRH = Loadable({
    loader: () => import('./views/HRH/HRH'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Resources = Loadable({
    loader: () => import('./views/Resources/Resources'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Organizations = Loadable({
    loader: () => import('./views/Administration/Organizations/Organizations'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Profile = Loadable({
    loader: () => import('./views/Users/Profile'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Tafsiri = Loadable({
    loader: () => import('./views/Tafsiri/Tafsiri'),
    loading: Loading,
    delay: LOADING_DELAY,
});

const routes = [
    {
        path: '/',
        exact: true,
        name: 'Home',
        component: withTracker(Home),
        private: false,
    },
    {
        path: '/reporting-rates/:active_tab?',
        exact: true,
        name: 'Reporting Rates',
        component: withTracker(RR),
        private: false,
    },
    {
        path: '/hiv-testing/:active_tab?/:mini_tab?',
        exact: true,
        name: 'HIV Testing & Prevention',
        component: withTracker(HTS),
        private: false,
    },
    {
        path: '/hiv-treatment/:active_tab?/:mini_tab?',
        exact: true,
        name: 'HIV Treatment',
        component: withTracker(CT),
        private: false,
    },
    {
        path: '/service-desk/:active_tab?',
        exact: true,
        name: 'Service Desk',
        component: withTracker(SD),
        private: false,
    },
    {
        path: '/operational-and-his/:active_tab?/:mini_tab?',
        exact: true,
        name: 'Operational & HIS Dashboards',
        component: withTracker(OperationalHIS),
        private: false,
    },
    {
        path: '/pmtct-rri/:active_tab?/:mini_tab?',
        exact: true,
        name: 'PMTCT RRI',
        component: withTracker(PMTCTRRI),
        private: false,
    },
    {
        path: '/gis',
        exact: true,
        name: 'GIS',
        component: withTracker(GIS),
        private: false,
    },
    {
        path: '/hrh',
        exact: true,
        name: 'HRH',
        component: withTracker(HRH),
        private: false,
    },
    {
        path: '/resources',
        exact: true,
        name: 'Resources',
        component: withTracker(Resources),
        private: false,
    },
    {
        path: '/administration/organizations',
        exact: true,
        name: 'Organizations',
        component: withTracker(Organizations),
        private: true,
    },
    {
        path: '/users/profile',
        exact: true,
        name: 'Profile',
        component: withTracker(Profile),
        private: true,
    },
    {
        path: '/highlight/monthly',
        exact: true,
        name: 'Highlight of the month',
        private: false,
    },
    {
        path: '/tafsiri',
        exact: true,
        name: 'TAFSIRI',
        private: true,
        component: withTracker(Tafsiri),
    },
];

export default routes;
