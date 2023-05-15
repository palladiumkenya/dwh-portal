import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem, Dropdown } from 'reactstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/dwh2.png';
import sygnet from '../../assets/img/brand/ic_launcher.png';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import avatar from '../../assets/img/avatars/avatar.png';
import { useSelector } from 'react-redux';
import { signinRedirect, signoutRedirect } from '../../services/UserService';
import { getUserById, metabaseLogin } from '../../views/Shared/Api';
import { useCookies } from 'react-cookie';

const DefaultHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = useSelector(state => state.auth.user)
    const loginAction = user ? "Logout" : "Login";
    const [userType, setUserType] = useState({

    });
    const [cookies, setCookie] = useCookies(['metabase.SESSION', 'metabase.TIMEOUT']);
    const loadUserType = useCallback(async () => {
        const userType = await getUserType();
        setUserType({
            userType: userType
        });
    }, []);

    const loadCookies = useCallback(async () => {
        if (user && !cookies['metabase.SESSION'] && !cookies['metabase.TIMEOUT']){
            let sessionId = await metabaseLogin();
            if (sessionId) {
                setCookie('metabase.SESSION', sessionId, { path: '/' });
            }
        }
    }, []); 
    const login = async () => {
        const res = await getUserType();
        if (user && !user.expired) {
            await signoutRedirect();
        } else {
            await signinRedirect();
        }
    };

    const getUserType = async () => {
        let userType = 0;
        if (user) {
            const result = await getUserById('User/' + user.profile.sub, user.access_token);
            return result.userType;
        }
        return userType;
    }

    const getAdministrationTab = async () => {
        return <Administration />
        const res = await getUserType();
        return  (res === 1 || res === 2) ? <Administration /> : null;
    }

    const clearCacheData = async () => {
        await localStorage.clear();
        if (localStorage.length === 0){
            alert('Complete Cache Cleared'); 
            window.location.reload();
        }
    };
    const toggle = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        loadUserType()
        loadCookies()
    }, [loadUserType, loadCookies]);

    return (
        <>
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
                full={{ src: logo, width: 'auto', height: 50, alt: 'DWH Logo' }}
                minimized={{ src: sygnet, alt: 'DWH Logo' }}
            />
            <Nav
                className="d-md-down-none navbar"
                style={{ fontSize: '.88em', padding: '.1rem !important' }}
            >
                <NavItem >
                    <NavLink to="/" className="nav-link active">
                        <strong>Home</strong>
                    </NavLink>
                </NavItem>
                <NavItem >
                    <NavLink to="/reporting-rates" className="nav-link active">
                        <strong>Reporting Rates</strong>
                    </NavLink>
                </NavItem>
                {/* <NavItem className="px-3">
                    <NavLink to="/hrh" className="nav-link">HRH</NavLink>
                </NavItem> */}
                <NavItem >
                    <NavLink to="/hiv-testing" className="nav-link active">
                        <strong>HIV Testing & Prevention</strong>
                    </NavLink>
                </NavItem>
                <NavItem >
                    <NavLink to="/hiv-treatment" className="nav-link active">
                        <strong>HIV Treatment</strong>
                    </NavLink>
                </NavItem>
{/* <NavItem>
                    <NavLink to="/service-desk" className="nav-link active">
                        <strong>Service Desk</strong>
                    </NavLink>
                </NavItem> */}
                <NavItem >
                    <NavLink to="/pmtct-rri" className="nav-link active">
                        <strong>PMTCT RRI</strong>
                    </NavLink>
                </NavItem>
                {/* <NavItem className="px-3">
                    <NavLink
                        to="/operational-and-his"
                        className="nav-link active"
                    >
                        <strong>Operational & HIS Dashboards</strong>
                    </NavLink>
                </NavItem> */}

                <NavItem>
                    <a
                        href="https://kenyahmis.org/documentation/data-dictionaries/"
                        className="nav-link active"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong>Resources</strong>
                    </a>
                </NavItem>
                {/* <NavItem >
                    <a
                        href="https://national-data-warehouse-gis-analytics-dwh.hub.arcgis.com/"
                        className="nav-link active"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong>GIS</strong>
                    </a>
                </NavItem> */}
                <NavItem >
                    <NavLink
                        to="/"
                        className="nav-link active"
                        onClick={() => clearCacheData()}
                    >
                        <strong style={{ color: 'red' }}>
                            Clear Cached Data
                        </strong>
                    </NavLink>
                </NavItem>
                {user && <Adhoc />}
                {userType.userType === 1 || userType.userType === 2 ? (
                    <Administration userType={userType} />
                ) : null}
            </Nav>
            <Nav className="ml-auto">
                <UncontrolledDropdown nav direction="down">
                    <DropdownToggle nav>
                        <strong>{user ? user.profile.FullName : ''}</strong>
                        <img
                            src={avatar}
                            className="img-avatar"
                            alt={user ? user.profile.email : ''}
                        />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header tag="div" className="text-center">
                            <strong>Settings</strong>
                        </DropdownItem>
                        {user ? (
                            <DropdownItem tag={Link} to={'/users/profile'}>
                                {' '}
                                <i className="fa fa-user" /> Profile{' '}
                            </DropdownItem>
                        ) : (
                            ''
                        )}
                        <DropdownItem divider />
                        <DropdownItem onClick={() => login()}>
                            <i className="fa fa-lock"></i> {loginAction}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </>
    );
}

const Adhoc = () => {
    return (
        <UncontrolledDropdown nav direction="down">
        <DropdownToggle nav>
            <strong>Self Service</strong>
        </DropdownToggle>
        <DropdownMenu right>
            <DropdownItem header tag="div">
                <strong>Platforms supporting Self Service</strong>
            </DropdownItem>
            <DropdownItem href={process.env.REACT_APP_ADHOC_URL} >
                <strong>Flex monster</strong>
            </DropdownItem>
            <DropdownItem href={process.env.REACT_APP_METABASE_URL} >
                <strong>Metabase</strong>
            </DropdownItem>
            <DropdownItem disabled={true} href={process.env.REACT_APP_METABASE_URL} >
                <strong>Superset</strong>
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
    );
};

const Administration = (userType) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret><strong>Administration</strong></DropdownToggle>
            <DropdownMenu right>
                { userType.userType === 1 ? <DropdownItem><Link to="/administration/organizations" className="nav-link">Organizations</Link></DropdownItem> : '' }

                <DropdownItem><a href="https://auth.kenyahmis.org/nascop/Users" className="nav-link">Users</a></DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

export default DefaultHeader;
