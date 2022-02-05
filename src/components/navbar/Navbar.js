import Styles from './Navbar.module.scss';

import IdeaHuntLogo from './../../assets/icons/ideaHuntLogo.png';
import UserIcon from './../../assets/icons/user-profile.svg';
import Hamburger from './../../assets/icons/hamburger.svg';

const Navbar = () => {
    return (
        <nav className={Styles.nav}>
            <div className={Styles.item} data-mobile-only>
                <img src={Hamburger} alt={'Side Menu'} onClick={() => ({})} />
            </div>
            <div className={`${Styles.item} ${Styles.logo}`}>
                <img src={IdeaHuntLogo} alt={'Idea Hunt Logo'} />
            </div>
            <div className={Styles.item} data-pc-only>
                <span>{'Contact Us'}</span>
            </div>
            <div className={`${Styles.item} ${Styles.userProfile}`}>
                <img src={UserIcon} alt={'User profile'} />
            </div>
        </nav>
    );
};

export default Navbar;
