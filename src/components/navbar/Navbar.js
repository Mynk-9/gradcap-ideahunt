import Styles from './Navbar.module.scss';

const Navbar = () => {
    return (
        <nav className={Styles.nav}>
            <div className={Styles.item}>{'IDEA HUNT'}</div>
            <div className={Styles.item}>{'Contact Us'}</div>
        </nav>
    );
};

export default Navbar;
