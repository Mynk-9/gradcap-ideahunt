import { useNavigate } from 'react-router-dom';

import Heading from '../../components/heading/Heading';
import PrimarySection from '../../components/primarysection/PrimarySection';
import RedButton from '../../components/redbutton/RedButton';
import RedLink from '../../components/redlink/RedLink';

import Styles from './Home.module.scss';

import ProfileIcon from './../../assets/icons/user-profile.svg';
import Rewards from './../../assets/images/special-deals.svg';
import IdeaHuntLogo from './../../assets/icons/idea-hunt.png';
import HeroArt from './../../assets/images/growth-2.svg';
import UserFlow from './../../assets/images/user-flow.png';

const Home = () => {
    const navigate = useNavigate();

    // generating dummy cards
    let _cards = [];
    for (let i = 0; i < 5; ++i) {
        _cards.push(
            <div className={Styles.card} key={`${i}`}>
                <div className={Styles.cardContent}>
                    <div>
                        <img src={ProfileIcon} alt={'User profile'} />
                    </div>
                    <div>
                        <span className={Styles.cardUserName}>{'Name'}</span>
                        <span className={Styles.cardUserCollege}>
                            {'College'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <PrimarySection hero={true}>
            <div className={Styles.hero}>
                <div>
                    <img src={IdeaHuntLogo} className={Styles.ideaHuntLogo} />
                    <div>
                        {
                            'An initiative by gradCapital to make your ideas come to life'
                        }
                    </div>
                </div>
                <div>
                    <img src={HeroArt} className={Styles.heroArt} />
                </div>
            </div>
            <div className={Styles.contentWrapper}>
                <div className={Styles.chainSection}>
                    <div>
                        <img src={UserFlow} />
                    </div>
                    <div>
                        <RedButton
                            text={'Go to idea Panel'}
                            onClick={() => navigate('/idea/panel')}
                        />
                    </div>
                </div>
                <Heading>{'Monthly Winners'}</Heading>
                <div className={Styles.monthlyWinners}>{_cards}</div>
                <div className={Styles.rewards}>
                    <div className={Styles.message}>
                        <Heading>{'Rewards'}</Heading>
                        <p>
                            {
                                'We offer a number of rewards for some of the best ideas that we carefully study and curate!'
                            }
                        </p>
                    </div>
                    <img src={Rewards} />
                </div>
                <RedLink text={'Go to Idea Panel'} link={'/idea/panel'} />
            </div>
        </PrimarySection>
    );
};

export default Home;
