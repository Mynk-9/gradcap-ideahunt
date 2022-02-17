import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';

import PrimarySection from './../../components/primarysection/PrimarySection';
import Heading from './../../components/heading/Heading';
import IdeaPanelAccordion from './../../components/ideapanelaccordion/IdeaPanelAccordion';

import LoginContext from '../../contexts/LoginContext';

import Styles from './Profile.module.scss';

import ProfileIcon from './../../assets/icons/user-profile.svg';
import LinkedinIcon from './../../assets/icons/linkedin-active.svg';
import InstagramIcon from './../../assets/icons/insta-active.svg';
import GmailIcon from './../../assets/icons/gmail-active.svg';
import TwitterIcon from './../../assets/icons/twitter-active.svg';
import ShareIcon from './../../assets/icons/share.svg';
import EditIcon from './../../assets/icons/edit.svg';
import CloseIcon from './../../assets/icons/close.svg';
import BookIcon from './../../assets/icons/book-open.svg';
import SpecialDealsImage from './../../assets/images/special-deals.svg';

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

const ProfileEditDialog = ({ open, handleClose, userData, setUserData }) => {
    if (!open) return <></>;

    const token = localStorage.getItem('g-token');
    const navigate = useNavigate();

    const boxRef = useRef(null);
    const [linkedInLink, setLinkedInLink] = useState(userData.linkedin);
    const [instaLink, setInstaLink] = useState(userData.instagram);
    const [twitterLink, setTwitterLink] = useState(userData.twitterLink);
    const [collegeName, setCollegeName] = useState(userData.college);
    const [gradYear, setGradYear] = useState(userData.gradYear);

    const handleDialogExit = e => {
        const { clientX: mouseX, clientY: mouseY } = e;
        const { left, right, top, bottom } =
            boxRef.current.getBoundingClientRect();

        if (mouseX < left || right < mouseX || mouseY < top || bottom < mouseY)
            handleClose();
    };

    const handleUserUpdate = field => {
        let data = '';
        if (field === 'linkedin') data = linkedInLink;
        else if (field === 'instagram') data = instaLink;
        else if (field === 'twitter') data = twitterLink;
        else if (field === 'college') data = collegeName;
        else if (field === 'gradYear') data = gradYear;
        else return;

        axios
            .post(
                `http://localhost:8050/user/profile/${field}`,
                {
                    data: data,
                },
                { headers: { authorization: token } }
            )
            .then(resp => {
                if (resp.status === 201) {
                    setUserData(oldUserData => ({
                        ...oldUserData,
                        [field]: data,
                    }));
                    alert('Saved');
                } else throw new Error('Error in saving.');
            })
            .catch(err => {
                console.log(err);
                alert('Session has expired. Please login again.');
                navigate('/login');
            });
    };

    return (
        <div className={Styles.profileEditDialog} onClick={handleDialogExit}>
            <div className={Styles.box} ref={boxRef}>
                <div className={Styles.row}>
                    <img src={CloseIcon} onClick={handleClose} />
                </div>
                <div className={Styles.row}>
                    <img src={BookIcon} />
                    <input
                        type="text"
                        placeholder="College Name"
                        value={collegeName ? collegeName : ''}
                        onChange={e => setCollegeName(e.target.value)}
                    />
                    <button onClick={() => handleUserUpdate('college')}>
                        {userData?.college ? 'Update' : 'Add'}
                    </button>
                </div>
                <div className={Styles.row}>
                    <img src={BookIcon} />
                    <input
                        type="text"
                        placeholder="Graduation Year"
                        value={gradYear ? gradYear : ''}
                        onChange={e => setGradYear(e.target.value)}
                    />
                    <button onClick={() => handleUserUpdate('gradYear')}>
                        {userData?.gradYear ? 'Update' : 'Add'}
                    </button>
                </div>
                <div className={Styles.row}>
                    <img src={LinkedinIcon} />
                    <input
                        type="text"
                        placeholder="Linkedin Profile Link"
                        value={linkedInLink ? linkedInLink : ''}
                        onChange={e => setLinkedInLink(e.target.value)}
                    />
                    <button onClick={() => handleUserUpdate('linkedin')}>
                        {userData?.linkedin ? 'Update' : 'Add'}
                    </button>
                </div>
                <div className={Styles.row}>
                    <img src={InstagramIcon} />
                    <input
                        type="text"
                        placeholder="Instagram Profile Link"
                        value={instaLink ? instaLink : ''}
                        onChange={e => setInstaLink(e.target.value)}
                    />
                    <button onClick={() => handleUserUpdate('instagram')}>
                        {userData?.instagram ? 'Update' : 'Add'}
                    </button>
                </div>
                <div className={Styles.row}>
                    <img src={TwitterIcon} />
                    <input
                        type="text"
                        placeholder="Twitter Profile Link"
                        value={twitterLink ? twitterLink : ''}
                        onChange={e => setTwitterLink(e.target.value)}
                    />
                    <button onClick={() => handleUserUpdate('twitter')}>
                        {userData?.twitter ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};
ProfileEditDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    userData: propTypes.any.isRequired,
    setUserData: propTypes.func.isRequired,
};

const getMemberSince = joiningDate => {
    if (!joiningDate) return null;
    const date = new Date(joiningDate.year, joiningDate.month, joiningDate.day);
    const month = date.toLocaleString('en-us', { month: 'short' });
    return `${month}'${joiningDate.year % 100}`;
};

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginData, setLoginData } = useContext(LoginContext);
    const [userData, setUserData] = useState(null);
    const [userIdeas, setUserIdeas] = useState(null);
    const [enableEdit, setEnableEdit] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const loggedIn = localStorage.getItem('g-token') ? true : false;

    // has got login data, would rerender only on loginData change
    useEffect(() => {
        // didn't login yet trying to access personal profile
        if (location.pathname === '/profile' && !loggedIn)
            navigate('/login', { replace: true });

        // get userId from URL
        let _locationComponents = location.pathname.split('/');
        let locationUserId = _locationComponents.pop();
        while (locationUserId === '/')
            locationUserId = _locationComponents.pop();

        // if fetching personal profile and logged in but loginData
        // is not loaded yet, then pass this hook call and render on
        // next one
        if (locationUserId === 'profile') {
            if (!loginData) return;

            // if logged in and login data available and opening self profile
            // using separate route, navigate to /profile
            if (locationUserId === loginData?.userId) navigate('/profile');

            // continue otherwise
            locationUserId = loginData.userId;
            setEnableEdit(true);
        }

        axios
            .get(`http://localhost:8050/user/${locationUserId}`)
            .then(resp => {
                if (resp.status !== 200) {
                    console.log('Error fetching user data', resp.data);
                    navigate(-1);
                }
                setUserData(resp.data);
            })
            .catch(err => {
                console.log(err);
                navigate(-1);
            });

        // fetch user ideas
        axios
            .get(`http://localhost:8050/ideas/user/${locationUserId}`)
            .then(({ data }) => {
                setUserIdeas(data.ideas);
            })
            .catch(err => {
                console.log(err);
            });
    }, [location, loginData]);

    return (
        <PrimarySection classNames={[Styles.primarySection]}>
            <div className={Styles.sectionColumn}>
                <Heading>{'Profile'}</Heading>
                <div className={Styles.profileBrief}>
                    <div className={Styles.profileColumn}>
                        <img
                            src={userData?.profileURL || ProfileIcon}
                            className={Styles.profileImage}
                        />
                        <img
                            src={SpecialDealsImage}
                            className={Styles.fillerImg}
                            data-mobile-only
                        />
                        <div className={Styles.infoNLinks} data-pc-only>
                            <span className={Styles.memberInfo}>
                                {`Member since ${
                                    getMemberSince(userData?.joiningDate) ||
                                    'always'
                                }`}
                            </span>
                            <div className={Styles.socialLinks}>
                                {userData?.linkedin ? (
                                    <img
                                        src={LinkedinIcon}
                                        onClick={() => {
                                            window.open(
                                                userData.linkedin,
                                                '_blank'
                                            );
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                                {userData?.instagram ? (
                                    <img
                                        src={InstagramIcon}
                                        onClick={() => {
                                            window.open(
                                                userData.instagram,
                                                '_blank'
                                            );
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                                {userData?.gmail ? (
                                    <img
                                        src={GmailIcon}
                                        onClick={() => {
                                            window.open(
                                                userData.gmail,
                                                '_blank'
                                            );
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                                {userData?.twitter ? (
                                    <img
                                        src={TwitterIcon}
                                        onClick={() => {
                                            window.open(
                                                userData.twitter,
                                                '_blank'
                                            );
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.profileColumn}>
                        <div className={Styles.profileName}>
                            <Heading>{`${userData?.name || 'Name'}`}</Heading>
                            {enableEdit && userData ? (
                                <>
                                    <img
                                        src={EditIcon}
                                        className={Styles.editButton}
                                        onClick={() => setOpenEdit(true)}
                                    />
                                    <ProfileEditDialog
                                        open={openEdit}
                                        handleClose={() => setOpenEdit(false)}
                                        userData={loginData}
                                        setUserData={setLoginData}
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <span className={Styles.collegeInfo}>
                            {`${userData?.college || 'College'}, ${
                                userData?.gradYear || 'year'
                            }`}
                        </span>
                        <div className={Styles.socialLinks} data-mobile-only>
                            {userData?.linkedin ? (
                                <img
                                    src={LinkedinIcon}
                                    onClick={() => {
                                        window.open(
                                            userData.linkedin,
                                            '_blank'
                                        );
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                            {userData?.instagram ? (
                                <img
                                    src={InstagramIcon}
                                    onClick={() => {
                                        window.open(
                                            userData.instagram,
                                            '_blank'
                                        );
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                            {userData?.gmail ? (
                                <img
                                    src={GmailIcon}
                                    onClick={() => {
                                        window.open(userData.gmail, '_blank');
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                            {userData?.twitter ? (
                                <img
                                    src={TwitterIcon}
                                    onClick={() => {
                                        window.open(userData.twitter, '_blank');
                                    }}
                                />
                            ) : (
                                <></>
                            )}
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
                            {userData?.rewards?.map(reward => (
                                <RewardsCard key={reward} text={reward} />
                            ))}
                        </div>
                    </div>
                </div>
                <Heading>{'Ideas'}</Heading>
                <div className={Styles.ideaList}>
                    {userIdeas?.map(idea => (
                        <IdeaPanelAccordion key={idea.ideaId} idea={idea} />
                    ))}
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
