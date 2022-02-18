import propTypes from 'prop-types';

import Styles from './RewardsCards.module.scss';

import BooksIcon from './../../assets/icons/Icon metro-books.svg';
import SocialIcon from './../../assets/icons/Group-120.svg';
import PeopleIcon from './../../assets/icons/Group-119.svg';
import TeacherIcon from './../../assets/icons/chalkboard-teacher.svg';
import TvIcon from './../../assets/icons/feather-tv.svg';

const Card = ({ text, icon }) => {
    return (
        <div className={Styles.card}>
            <div className={Styles.text}>
                <span>{text}</span>
            </div>
            <div className={Styles.image}>
                <img src={icon} />
            </div>
        </div>
    );
};
Card.propTypes = {
    text: propTypes.string.isRequired,
    icon: propTypes.string.isRequired,
};

const RewardsCards = () => {
    return (
        <div className={Styles.rewardsSection}>
            <Card
                text="Win some of the best books/ novels out there!"
                icon={BooksIcon}
            />
            <Card
                text="Get a chance to be featured by gradCapital on all social media handles"
                icon={SocialIcon}
            />
            <Card text="Opportunity to pitch to us!" icon={PeopleIcon} />
            <Card
                text="Attain mentorship and guidance for some jaw-dropping ideas"
                icon={TeacherIcon}
            />
            <Card
                text="Subscriptions for some of your favourite platforms (curiositystream, MagellanTV)"
                icon={TvIcon}
            />
        </div>
    );
};

export default RewardsCards;
