import propTypes from 'prop-types';

import Styles from './RewardsCards.module.scss';

const Card = ({ text, icon }) => {
    return (
        <div className={Styles.card}>
            <div className={Styles.text}>
                <span>{text}</span>
            </div>
            <div className={Styles.image}>
                <span>{icon}</span>
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
                text="Get a chance to be featured by gradCapital on all social media handles"
                icon="Get Featured"
            />
            <Card
                text="Opportunity to pitch to us!"
                icon="Pitch to gradCapital"
            />
            <Card
                text="Win some of the best books/ novels out there!"
                icon="Books"
            />
            <Card
                text="Attain mentorship and guidance for some jaw-dropping ideas"
                icon="Mentorship"
            />
            <Card
                text="Subscriptions for some of your favourite platforms (curiositystream, MagellanTV)"
                icon="Subscriptions"
            />
        </div>
    );
};

export default RewardsCards;
