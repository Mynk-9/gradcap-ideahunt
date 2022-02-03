import Styles from './Navbar.module.scss';

import IdeaHuntLogo from './../../assets/icons/ideaHuntLogo.png';
import UserIcon from './../../assets/icons/user-profile.svg';

const Navbar = () => {
    return (
        <nav className={Styles.nav}>
            <div className={Styles.item}>
                <img src={IdeaHuntLogo} alt={'Idea Hunt Logo'} />
            </div>
            <div className={Styles.item}>
                <span>{'Contact Us'}</span>
                <img src={UserIcon} alt={'User profile'} />
            </div>
        </nav>
    );
};

export default Navbar;
