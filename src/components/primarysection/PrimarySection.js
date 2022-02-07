import propTypes from 'prop-types';

import Styles from './PrimarySection.module.scss';

const PrimarySection = ({ children, hero, styles, classNames }) => {
    if (!classNames) classNames = [];
    if (hero) classNames.push(Styles.hero);

    return (
        <div
            className={`${Styles.primarySection} ${
                classNames ? classNames.join(' ') : ''
            }`}
            style={styles}
        >
            {children}
        </div>
    );
};

PrimarySection.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node,
    ]).isRequired,
    hero: propTypes.bool,
    styles: propTypes.object,
    classNames: propTypes.arrayOf(propTypes.string),
};

export default PrimarySection;
