import Styles from './Footer.module.scss';

import GradCapitalLogo from './../../assets/icons/gradCapitalLogo.png';
import TwitterIcon from './../../assets/icons/twitter.svg';
import InstagramIcon from './../../assets/icons/insta.svg';
import LinkedinIcon from './../../assets/icons/linkedin.svg';

const Footer = () => {
    return (
        <footer className={Styles.footer}>
            <div className={Styles.sectionAddress}>
                <div>{'Q-58, Diamond District, Domlur'}</div>
                <div>{'Bengaluru, 560008'}</div>
            </div>
            <div className={Styles.sectionLinks}>
                <img className={Styles.logo} src={GradCapitalLogo} />
                <img
                    src={TwitterIcon}
                    onClick={() => {
                        window.open(
                            'https://twitter.com/gradcapital',
                            '_blank'
                        );
                    }}
                />
                <img
                    src={LinkedinIcon}
                    onClick={() => {
                        window.open(
                            'https://www.linkedin.com/company/gradcapital',
                            '_blank'
                        );
                    }}
                />
                <img
                    src={InstagramIcon}
                    onClick={() => {
                        window.open(
                            'https://www.instagram.com/gradcapital/',
                            '_blank'
                        );
                    }}
                />
            </div>
        </footer>
    );
};

export default Footer;
