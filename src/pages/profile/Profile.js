import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

import PrimarySection from './../../components/primarysection/PrimarySection';
import Heading from './../../components/heading/Heading';
import IdeaPanelAccordion from './../../components/ideapanelaccordion/IdeaPanelAccordion';

import Styles from './Profile.module.scss';

import ProfileIcon from './../../assets/icons/user-profile.svg';
import LinkedinIcon from './../../assets/icons/linkedin-inactive.svg';
import InstagramIcon from './../../assets/icons/insta-inactive.svg';
import GmailIcon from './../../assets/icons/gmail-inactive.svg';
import TwitterIcon from './../../assets/icons/twitter-inactive.svg';
import ShareIcon from './../../assets/icons/share.svg';
import EditIcon from './../../assets/icons/edit.svg';
import SpecialDealsImage from './../../assets/images/special-deals.svg';

const dummyIdea = {
    profile: ProfileIcon,
    heading: 'Consumable plastic for saving the environment',
    likes: 50,
    comments: 5,
    details:
        'This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this. This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this.',
};

const RewardsCard = ({ text, onClick, link, background }) => {
    const navigate = useNavigate();

    let divProps = { style: {} };
    let spanProps = { style: {} };
    if (onClick) {
        divProps.onClick = onClick;
        divProps.style.cursor = 'pointer';
    }
    if (background === 'gradient') {
        divProps.style.background = 'var(--blue-gradient)';
        spanProps.style.color = 'white';
    } else if (background != null) divProps.style.background = background;
    else divProps.style.background = 'white';

    return (
        <div className={Styles.rewardsCard} {...divProps}>
            <span className={Styles.text} {...spanProps}>
                {text}
            </span>
            {link ? (
                <img
                    src={ShareIcon}
                    className={Styles.share}
                    onClick={() => navigate(link)}
                />
            ) : (
                <></>
            )}
        </div>
    );
};
RewardsCard.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    link: propTypes.string,
    background: propTypes.string,
};

const Profile = () => {
    const navigate = useNavigate();

    const joiningDate = "Nov'2020";

    return (
        <PrimarySection classNames={[Styles.primarySection]}>
            <div className={Styles.sectionColumn}>
                <Heading>{'Profile'}</Heading>
                <div className={Styles.profileBrief}>
                    <div className={Styles.profileColumn}>
                        <img
                            src={ProfileIcon}
                            className={Styles.profileImage}
                        />
                        <img
                            src={SpecialDealsImage}
                            className={Styles.fillerImg}
                            data-mobile-only
                        />
                        <div className={Styles.infoNLinks} data-pc-only>
                            <span className={Styles.memberInfo}>
                                {`Member since ${joiningDate}`}
                            </span>
                            <div className={Styles.socialLinks}>
                                <img src={LinkedinIcon} />
                                <img src={InstagramIcon} />
                                <img src={GmailIcon} />
                                <img src={TwitterIcon} />
                            </div>
                        </div>
                    </div>
                    <div className={Styles.profileColumn}>
                        <div className={Styles.profileName}>
                            <Heading>{'Interesting Name'}</Heading>
                            <img src={EditIcon} className={Styles.editButton} />
                        </div>
                        <span className={Styles.collegeInfo}>
                            {'College, year'}
                        </span>
                        <div className={Styles.socialLinks} data-mobile-only>
                            <img src={LinkedinIcon} />
                            <img src={InstagramIcon} />
                            <img src={GmailIcon} />
                            <img src={TwitterIcon} />
                        </div>
                        <div className={Styles.rewards}>
                            <span className={Styles.rewardsHeading}>
                                {'Win Rewards today!'}
                            </span>
                            <RewardsCard
                                text={'Post your idea'}
                                onClick={() => navigate('/post-idea')}
                                background={'gradient'}
                            />
                            <RewardsCard
                                text={"Winner for June'21"}
                                link={'/'}
                            />
                            <RewardsCard
                                text={"Opportunity to Pitch, Aug'21"}
                                link={'/'}
                            />
                        </div>
                    </div>
                </div>
                <Heading>{'Ideas'}</Heading>
                <div className={Styles.ideaList}>
                    <IdeaPanelAccordion idea={dummyIdea} />
                    <IdeaPanelAccordion idea={dummyIdea} />
                    <IdeaPanelAccordion idea={dummyIdea} />
                </div>
            </div>
            <img
                src={SpecialDealsImage}
                alt={'art'}
                className={Styles.columnArt}
                data-pc-only
            />
        </PrimarySection>
    );
};

export default Profile;
