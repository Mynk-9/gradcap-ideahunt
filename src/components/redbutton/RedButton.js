import propTypes from 'prop-types';
import Styles from './redButton.module.scss';

const RedButton = ({ text, onClick, styles, classNames }) => {
    return (
        <button
            className={`${Styles.redButton} ${
                classNames ? classNames.join(' ') : ''
            }`}
            onClick={onClick}
            style={styles}
        >
            {text}
        </button>
    );
};

RedButton.propTypes = {
    text: propTypes.string.isRequired,
    onClick: propTypes.func,
    styles: propTypes.object,
    classNames: propTypes.arrayOf(propTypes.string),
};

export default RedButton;
