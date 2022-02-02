import PropTypes from 'prop-types';

import Styles from './PrimarySection.module.scss';

const PrimarySection = ({ children }) => {
    return <div className={Styles.primarySection}>{children}</div>;
};

PrimarySection.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default PrimarySection;
