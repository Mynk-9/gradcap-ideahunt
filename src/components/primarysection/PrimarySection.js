import PropTypes from 'prop-types';

import Styles from './PrimarySection.module.scss';

const PrimarySection = ({ children, hero, styles }) => {
    return (
        <div
            className={`${Styles.primarySection} ${hero ? Styles.hero : ''}`}
            style={styles}
        >
            {children}
        </div>
    );
};

PrimarySection.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    hero: PropTypes.bool,
    styles: PropTypes.object,
};

export default PrimarySection;
