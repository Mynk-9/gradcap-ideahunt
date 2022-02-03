import PropTypes from 'prop-types';

import Styles from './PrimarySection.module.scss';

const PrimarySection = ({ children, hero }) => {
    return (
        <div className={`${Styles.primarySection} ${hero ? Styles.hero : ''}`}>
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
};

export default PrimarySection;
