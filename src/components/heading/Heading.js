import propTypes from 'prop-types';

import Styles from './Heading.module.scss';

const Heading = ({ children, onClick }) => {
    let styles = {};
    if (onClick) styles.cursor = 'pointer';
    return (
        <h1 className={Styles.heading}>
            <span onClick={onClick} style={styles}>
                {children}
            </span>
        </h1>
    );
};

Heading.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node,
        propTypes.string,
    ]),
    onClick: propTypes.func,
};

export default Heading;
