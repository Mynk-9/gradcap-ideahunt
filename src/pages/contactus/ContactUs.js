import Heading from '../../components/heading/Heading';
import PrimarySection from '../../components/primarysection/PrimarySection';

import Styles from './ContactUs.module.scss';

import NewsletterArt from './../../assets/images/buddha.png';
import RedSendIcon from './../../assets/icons/red-subscribe.png';

const ContactUs = () => {
    return (
        <PrimarySection>
            <Heading>{'Contact us'}</Heading>
            <div className={Styles.cards}>
                <div className={Styles.cardWrapper}>
                    <div className={Styles.card}>
                        <div>
                            {'Do you have a '}
                            <span className={Styles.emphasis}>
                                {'solid idea'}
                            </span>
                            {
                                ' that can be turned into a start-up? gradCapital funds '
                            }
                            <span className={Styles.emphasis}>
                                {'student led start-ups'}
                            </span>
                            {
                                ' and if you have complied with the following requirements then you may apply!'
                            }
                        </div>
                        <div>
                            {'• A student/recent graduate'}
                            <br />
                            {
                                '• A strong idea/pitch/ brief or anything tangible to show'
                            }
                        </div>
                        <button
                            className={Styles.action}
                            data-mobile-only
                            onClick={() =>
                                window.open(
                                    'https://tally.so/r/wQzyXn',
                                    '_blank'
                                )
                            }
                        >
                            {'Apply'}
                        </button>
                    </div>
                    <button
                        className={Styles.action}
                        data-pc-only
                        onClick={() =>
                            window.open('https://tally.so/r/wQzyXn', '_blank')
                        }
                    >
                        {'Apply'}
                    </button>
                </div>
                <div className={Styles.cardWrapper}>
                    <div className={Styles.card}>
                        <div>
                            {
                                "Think your idea is almost there but not sure how to proceed? Don't worry we've got your back."
                            }
                        </div>
                        <button
                            className={Styles.action}
                            data-mobile-only
                            onClick={() =>
                                window.open(
                                    'https://tally.so/r/wQzyXn',
                                    '_blank'
                                )
                            }
                        >
                            {'Let us know'}
                        </button>
                    </div>
                    <button
                        className={Styles.action}
                        data-pc-only
                        onClick={() =>
                            window.open('https://tally.so/r/wQzyXn', '_blank')
                        }
                    >
                        {'Let us know'}
                    </button>
                </div>
                <div className={Styles.cardWrapper}>
                    <div className={Styles.card}>
                        <div>
                            {'Want to join the gradCapital '}
                            <span className={Styles.emphasis}>
                                {'Community?'}
                            </span>
                        </div>
                        <div>
                            {
                                '• We discuss about various start-ups, trends, what’s upcoming and strategies, etc.'
                            }
                        </div>
                        <button
                            className={Styles.action}
                            data-mobile-only
                            onClick={() =>
                                window.open(
                                    'https://tally.so/r/3E6Wow',
                                    '_blank'
                                )
                            }
                        >
                            {'Sign Up'}
                        </button>
                    </div>
                    <button
                        className={Styles.action}
                        data-pc-only
                        onClick={() =>
                            window.open('https://tally.so/r/3E6Wow', '_blank')
                        }
                    >
                        {'Sign Up'}
                    </button>
                </div>
            </div>
            <div className={Styles.newsletterWrapper}>
                <div className={Styles.newsletter}>
                    <div className={Styles.col}>
                        <img src={NewsletterArt} />
                    </div>
                    <div className={Styles.col}>
                        <div>{'Subscribe to gC Newsletter'}</div>
                        <div>
                            {
                                "gradCapital's newsletter involves information about our funded start-ups, plans, tips and other stuff"
                            }
                        </div>
                        <div>
                            <input type={'text'} placeholder={'Your e-mail'} />
                            <button className={Styles.subs}>
                                <img src={RedSendIcon} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PrimarySection>
    );
};

export default ContactUs;
