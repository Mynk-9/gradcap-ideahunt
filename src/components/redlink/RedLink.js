import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import Styles from './RedLink.module.scss';

const RedLink = ({ text, link, onClick, styles, classNames }) => {
    return (
        <div
            className={`${Styles.redLink} ${
                classNames ? classNames.join(' ') : ''
            }`}
            style={styles}
        >
            {link ? (
                <Link to={link}>{text}</Link>
            ) : (
                <span style={{ cursor: 'pointer' }} onClick={onClick}>
                    {text}
                </span>
            )}
        </div>
    );
};

RedLink.propTypes = {
    text: propTypes.string.isRequired,
    link: propTypes.string,
    onClick: propTypes.func,
    styles: propTypes.object,
    classNames: propTypes.arrayOf(propTypes.string),
};

export default RedLink;
