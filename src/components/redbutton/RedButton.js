import propTypes from 'prop-types';
import Styles from './redButton.module.scss';

const RedButton = ({ text, onClick }) => {
    return (
        <button className={Styles.redButton} onClick={onClick}>
            {text}
        </button>
    );
};

RedButton.propTypes = {
    text: propTypes.string.isRequired,
    onClick: propTypes.func,
};

export default RedButton;
