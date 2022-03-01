import { useContext, useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import SidenavContext from '../../contexts/SidenavContext';

import Styles from './SideNav.module.scss';

import CloseIcon from './../../assets/icons/close.svg';

const SideNavButton = data => {
    let location = useLocation();
    let navigate = useNavigate();

    const correctLocation = data.checkPaths.find(path =>
        new RegExp(path).test(location.pathname)
    )
        ? true
        : false;

    let renderOptions = {};
    if (data.mobileOnly) renderOptions['data-mobile-only'] = 'true';

    return (
        <button
            className={Styles.button}
            onClick={() => navigate(data.path)}
            data-link-active={correctLocation ? 'true' : 'false'}
            {...renderOptions}
        >
            {correctLocation ? (
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
    const sideNavRef = useRef(null);

    useEffect(() => {
        setNavActive(active);
    }, [active]);

    const focusLoseHandler = e => {
        const { clientX: mouseX, clientY: mouseY } = e;
        const { left, right, top, bottom } =
            sideNavRef.current.getBoundingClientRect();

        if (mouseX < left || right < mouseX || mouseY < top || bottom < mouseY)
            setActive(false);
    };

    let renderOptions = {};
    if (mobileVisible && !pcVisible) renderOptions['data-mobile-only'] = 'true';
    else if (!mobileVisible && pcVisible)
        renderOptions['data-pc-only'] = 'true';

    return (
        <div
            className={Styles.wrapper}
            data-active={navActive}
            onClick={focusLoseHandler}
        >
            <div
                className={Styles.sideNav}
                {...renderOptions}
                data-active={navActive}
                ref={sideNavRef}
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
        </div>
    );
};

const dataShapePropType = propTypes.shape({
    text: propTypes.string.isRequired,
    iconInactive: propTypes.string,
    iconActive: propTypes.string,
    path: propTypes.string.isRequired,
    mobileOnly: propTypes.bool,
    checkPaths: propTypes.arrayOf(propTypes.instanceOf(RegExp)),
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
