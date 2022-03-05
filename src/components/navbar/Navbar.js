import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import SidenavContext from '../../contexts/SidenavContext';
import LoginContext from '../../contexts/LoginContext';

import Styles from './Navbar.module.scss';

import IdeaHuntLogo from './../../assets/icons/ideaHuntLogo.png';
import UserIcon from './../../assets/icons/user-profile.svg';
import Hamburger from './../../assets/icons/hamburger.svg';

const Navbar = () => {
    const { setActive } = useContext(SidenavContext);
    const { loginData } = useContext(LoginContext);
    const [profileImg, setProfileImg] = useState(UserIcon);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loginData && loginData.profileURL)
            setProfileImg(loginData.profileURL);
    }, [loginData]);

    return (
        <nav className={Styles.nav}>
            <div className={Styles.item} data-mobile-only>
                <img
                    src={Hamburger}
                    alt={'Side Menu'}
                    onClick={() => setActive(true)}
                />
            </div>
            <div className={`${Styles.item} ${Styles.logo}`}>
                <img
                    src={IdeaHuntLogo}
                    alt={'Idea Hunt Logo'}
                    onClick={() => navigate('/home')}
                />
            </div>
            <div className={Styles.item} data-pc-only>
                <span
                    style={{
                        color:
                            location.pathname === '/contact-us'
                                ? '#C86374'
                                : 'inherit',
                    }}
                >
                    <Link to={'/contact-us'}>{'Contact Us'}</Link>
                </span>
            </div>
            <div
                className={Styles.item}
                style={{ display: loginData ? 'none' : '' }}
                data-pc-only
            >
                <Link to={'/login'}>{'Login'}</Link>
            </div>
            <div className={`${Styles.item} ${Styles.userProfile}`}>
                <img
                    src={profileImg}
                    alt={''}
                    onClick={() => navigate('profile')}
                />
            </div>
        </nav>
    );
};

export default Navbar;
