import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SidenavContext from '../../contexts/SidenavContext';

import Styles from './Navbar.module.scss';

import IdeaHuntLogo from './../../assets/icons/ideaHuntLogo.png';
import UserIcon from './../../assets/icons/user-profile.svg';
import Hamburger from './../../assets/icons/hamburger.svg';

const Navbar = () => {
    const { setActive } = useContext(SidenavContext);
    const navigate = useNavigate();

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
                <img src={IdeaHuntLogo} alt={'Idea Hunt Logo'} />
            </div>
            <div className={Styles.item} data-pc-only>
                <Link to={'/contact-us'}>{'Contact Us'}</Link>
            </div>
            <div className={`${Styles.item} ${Styles.userProfile}`}>
                <img
                    src={UserIcon}
                    alt={'User profile'}
                    onClick={() => navigate('profile')}
                />
            </div>
        </nav>
    );
};

export default Navbar;
