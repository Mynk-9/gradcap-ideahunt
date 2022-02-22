import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import getProfilePage from '../../utilities/getProfilePage';

const ProfileImage = ({ src, userId, classes, styles, onclick }) => {
    const navigate = useNavigate();

    return (
        <img
            src={src}
            className={classes ? `${classes} profile-image` : 'profile-image'}
            style={styles ? styles : {}}
            onClick={() => {
                if (onclick) {
                    onclick();
                } else {
                    navigate(getProfilePage(userId));
                }
            }}
            alt="profile image"
        />
    );
};

ProfileImage.propTypes = {
    src: propTypes.string.isRequired,
    userId: propTypes.string.isRequired,
    classes: propTypes.string,
    styles: propTypes.any,
    onclick: propTypes.func,
};

export default ProfileImage;
