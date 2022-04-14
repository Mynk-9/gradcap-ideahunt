import { useNavigate } from 'react-router-dom';

import Heading from '../../components/heading/Heading';
import PrimarySection from '../../components/primarysection/PrimarySection';
import RedButton from '../../components/redbutton/RedButton';
// import RedLink from '../../components/redlink/RedLink';

import Styles from './Home.module.scss';

import ProfileIcon from './../../assets/icons/user-profile.svg';
import Rewards from './../../assets/images/special-deals.svg';
import IdeaHuntLogo from './../../assets/icons/idea-hunt.png';
import HeroArt from './../../assets/images/growth-2.svg';
import UserFlow1 from './../../assets/images/user-flow-1.png';
import UserFlow2 from './../../assets/images/user-flow-2.png';
import UserFlow3 from './../../assets/images/user-flow-3.png';
import UserFlow4 from './../../assets/images/user-flow-4.png';
import UserFlow5 from './../../assets/images/user-flow-5.png';
import RewardsCards from '../../components/rewardscards/RewardsCards';

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
                        <img
                            src={UserFlow1}
                            onClick={() => navigate('/login')}
                        />
                        <img
                            src={UserFlow2}
                            onClick={() => navigate('/post-idea')}
                        />
                        <img
                            src={UserFlow3}
                            onClick={() => navigate('/idea/panel')}
                        />
                        <a href="#rewards-section">
                            <img src={UserFlow4} />
                        </a>
                        <a href="#rewards-section">
                            <img src={UserFlow5} />
                        </a>
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
                <div className={Styles.rewards} id="rewards-section">
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
                <RewardsCards />
                {/* <RedLink text={'Go to Idea Panel'} link={'/idea/panel'} /> */}
            </div>
        </PrimarySection>
    );
};

export default Home;
