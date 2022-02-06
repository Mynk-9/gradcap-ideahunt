import { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import SidenavContext from '../../contexts/SidenavContext';

import Styles from './SideNav.module.scss';

import CloseIcon from './../../assets/icons/close.svg';

const SideNavButton = data => {
    let location = useLocation();
    let navigate = useNavigate();

    let renderOptions = {};
    if (data.mobileOnly) renderOptions['data-mobile-only'] = 'true';

    return (
        <button
            className={Styles.button}
            onClick={() => navigate(data.path)}
            linkactive={location.pathname === data.path ? 'true' : 'false'}
            {...renderOptions}
        >
            {location.pathname === data.path ? (
                <img src={data.iconActive} alt={data.text} />
            ) : (
                <img src={data.iconInactive} alt={data.text} />
            )}
            <span className={Styles.text}>{data.text}</span>
        </button>
    );
};

const SideNav = ({ buttons, mobileVisible, pcVisible }) => {
    const { active, setActive } = useContext(SidenavContext);
    const [navActive, setNavActive] = useState(active);

    useEffect(() => {
        setNavActive(active);
    }, [active]);

    let renderOptions = {};
    if (mobileVisible && !pcVisible) renderOptions['data-mobile-only'] = 'true';
    else if (!mobileVisible && pcVisible)
        renderOptions['data-pc-only'] = 'true';

    return (
        <div
            className={Styles.sideNav}
            {...renderOptions}
            data-active={navActive}
        >
            <img
                src={CloseIcon}
                className={Styles.closeButton}
                alt={'Close'}
                onClick={() => setActive(false)}
            />
            {buttons.map(data => (
                <SideNavButton {...data} key={data.text} />
            ))}
        </div>
    );
};

const dataShapePropType = propTypes.shape({
    text: propTypes.string.isRequired,
    iconInactive: propTypes.string,
    iconActive: propTypes.string,
    path: propTypes.string.isRequired,
    mobileOnly: propTypes.bool,
});

SideNavButton.propTypes = {
    data: dataShapePropType,
};

SideNav.propTypes = {
    buttons: propTypes.arrayOf(dataShapePropType),
    mobileVisible: propTypes.bool,
    pcVisible: propTypes.bool,
};

export default SideNav;
