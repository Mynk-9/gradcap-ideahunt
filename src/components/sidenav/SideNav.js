import propTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import Styles from './SideNav.module.scss';

const SideNavButton = data => {
    let location = useLocation();
    let navigate = useNavigate();

    return (
        <button
            className={Styles.sideNavButton}
            onClick={() => navigate(data.path)}
            linkActive={location.pathname === data.path ? 'true' : 'false'}
        >
            <img src={data.icon} alt={data.text} />
            <span className={Styles.text}>{data.text}</span>
        </button>
    );
};

const SideNav = ({ buttons }) => {
    return (
        <div className={Styles.sideNav}>
            {buttons.map(data => (
                <SideNavButton {...data} key={data.text} />
            ))}
        </div>
    );
};

const dataShapePropType = propTypes.shape({
    text: propTypes.string.isRequired,
    icon: propTypes.string.isRequired,
    path: propTypes.string.isRequired,
});

SideNavButton.propTypes = {
    data: dataShapePropType,
};

SideNav.propTypes = {
    buttons: propTypes.arrayOf(dataShapePropType),
};

export default SideNav;