import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import Styles from './RedLink.module.scss';

const RedLink = ({ text, link, styles, classNames }) => {
    return (
        <div
            className={`${Styles.redLink} ${
                classNames ? classNames.join(' ') : ''
            }`}
            style={styles}
        >
            <Link to={link}>{text}</Link>
        </div>
    );
};

RedLink.propTypes = {
    text: propTypes.string.isRequired,
    link: propTypes.string.isRequired,
    styles: propTypes.object,
    classNames: propTypes.arrayOf(propTypes.string),
};

export default RedLink;
