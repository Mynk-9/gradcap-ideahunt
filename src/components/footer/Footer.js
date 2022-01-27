import Styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={Styles.footer}>
            <div className={Styles['section-address']}></div>
            <div className={Styles['section-links']}></div>
        </footer>
    );
};

export default Footer;
