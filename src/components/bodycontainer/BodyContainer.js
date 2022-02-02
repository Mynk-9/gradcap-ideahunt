import PropTypes from 'prop-types';

import Styles from './BodyContainer.module.scss';

const BodyContainer = ({ children }) => {
    return <div className={Styles.bodyContainer}>{children}</div>;
};

BodyContainer.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
};

export default BodyContainer;
