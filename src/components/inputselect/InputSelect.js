import { useState } from 'react';
import propTypes from 'prop-types';

import Styles from './InputSelect.module.scss';

import DownArrowIcon from './../../assets/icons/chevron-down.svg';

const InputSelect = ({ options, defaultOption, onChange }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(defaultOption);

    const handleOnChange = val => {
        setOpen(false);
        setSelected(val);
        if (onChange) onChange(val);
    };

    return (
        <div className={Styles.selectionWrapper} data-open={open}>
            <div className={Styles.selected}>
                <span>{selected}</span>
                <img
                    src={DownArrowIcon}
                    onClick={() => setOpen(state => !state)}
                />
            </div>
            <div className={Styles.options}>
                {options
                    .filter(option => option != selected)
                    .map(option => (
                        <div
                            className={Styles.option}
                            onClick={() => handleOnChange(option)}
                            key={option}
                        >
                            {option}
                        </div>
                    ))}
            </div>
        </div>
    );
};

InputSelect.propTypes = {
    options: propTypes.arrayOf(propTypes.string).isRequired,
    defaultOption: propTypes.string.isRequired,
    onChange: propTypes.func,
};

export default InputSelect;
