import propTypes from 'prop-types';

import Styles from './Heading.module.scss';

const Heading = ({ children }) => {
    return <h1 className={Styles.heading}>{children}</h1>;
};

Heading.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node,
        propTypes.string,
    ]),
};

export default Heading;
