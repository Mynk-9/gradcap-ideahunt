import { Outlet } from 'react-router-dom';

import PrimarySection from '../../components/primarysection/PrimarySection';
import Heading from '../../components/heading/Heading';

import Styles from './Idea.module.scss';

import Img1 from './../../assets/images/discovery.svg';
import Img2 from './../../assets/images/blogging.svg';
import Img3 from './../../assets/images/idea-2.svg';
import Img4 from './../../assets/images/special-deals.svg';
import RewardsCards from '../../components/rewardscards/RewardsCards';

const IdeaPanel = () => {
    return (
        <PrimarySection hero={false} className={Styles.primarySectionModified}>
            <Heading>{'Idea Panel'}</Heading>
            <div className={Styles.pageColumnWrapper}>
                <Outlet />
                <div className={Styles.pageColumn} data-pc-only>
                    <img src={Img1} />
                    <img src={Img2} />
                    <img src={Img3} />
                </div>
            </div>
            <div className={Styles.rewards}>
                <div className={Styles.message}>
                    <Heading>{'Rewards'}</Heading>
                    <p>
                        {
                            'We offer a number of rewards for some of the best ideas that we carefully study and curate!'
                        }
                    </p>
                </div>
                <img src={Img4} />
            </div>
            <RewardsCards />
        </PrimarySection>
    );
};

export default IdeaPanel;
