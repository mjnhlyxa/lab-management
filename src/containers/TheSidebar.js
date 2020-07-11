import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import styled from 'styled-components';
import { Text } from 'rebass';
import { FaFlask } from 'react-icons/fa';
import { withTranslation } from 'react-i18next';

// sidebar nav config
import navigation1 from './_nav';
import { setSideBar } from 'actions/actions';

const SideBarBrand = styled(CSidebarBrand)`
    text-decoration: none !important;
`;

const LogoIcon = styled(FaFlask)`
    margin-bottom: 0.4rem;
    margin-right: 0.4rem;
`;

const Logo = () => {
    return (
        <Text fontSize="1.3rem" fontWeight="bold">
            <LogoIcon />
            Laboratory Manager
        </Text>
    );
};

const TheSidebar = ({ t, setSideBar }) => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.sidebar.sidebarShow);
    const [navigation, setNavigation] = useState([]);
    useEffect(() => {
        setNavigation([
            {
                _tag: 'CSidebarNavDropdown',
                name: t('sideBar.menu.hrManagement'),
                route: '/test',
                icon: 'cil-puzzle',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: t('sideBar.menu.positionMgnt'),
                        to: '/test',
                    },
                    {
                        _tag: 'CSidebarNavItem',
                        name: t('sideBar.menu.hrManagement'),
                        to: '/',
                    },
                ],
            },
            {
                _tag: 'CSidebarNavDropdown',
                name: t('sideBar.menu.customerMgnt'),
                route: '/base',
                icon: 'cil-cursor',
            },
            {
                _tag: 'CSidebarNavDropdown',
                name: t('sideBar.menu.userMgnt'),
                route: '/users',
                icon: 'cil-puzzle',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: t('sideBar.menu.user'),
                        to: '/users',
                    },
                ],
            },
        ]);
    }, [t]);

    return (
        <CSidebar show={show} onShowChange={(val) => dispatch(setSideBar(val))}>
            <SideBarBrand className="d-md-down-none" to="/">
                <Logo />
                {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
                <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={35} />
            </SideBarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
};

const mapDispatchToProps = {
    setSideBar,
};

export default React.memo(connect(null, mapDispatchToProps)(withTranslation()(TheSidebar)));
