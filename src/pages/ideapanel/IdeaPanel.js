import { useNavigate } from 'react-router-dom';

import PrimarySection from '../../components/primarysection/PrimarySection';
import IdeaPanelAccordion from '../../components/ideapanelaccordion/IdeaPanelAccordion';
import Pagination from '../../components/pagination/Pagination';
import Heading from '../../components/heading/Heading';

import Styles from './IdeaPanel.module.scss';

import UserIcon from './../../assets/icons/user-profile.svg';
import Img1 from './../../assets/images/discovery.svg';
import Img2 from './../../assets/images/blogging.svg';
import Img3 from './../../assets/images/idea-2.svg';
import Img4 from './../../assets/images/special-deals.svg';
import InputSelect from '../../components/inputselect/InputSelect';

const dummyIdea = {
    profile: UserIcon,
    heading: 'Consumable plastic for saving the environment',
    likes: 50,
    comments: 5,
    details:
        'This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this. This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this.',
};

const dummyIdeas = [
    dummyIdea,
    dummyIdea,
    dummyIdea,
    dummyIdea,
    dummyIdea,
    dummyIdea,
    dummyIdea,
    dummyIdea,
];

const IdeaPanel = () => {
    let navigate = useNavigate();

    return (
        <PrimarySection hero={false} className={Styles.primarySectionModified}>
            <Heading>{'Idea Panel'}</Heading>
            <div className={Styles.pageColumnWrapper}>
                <div className={Styles.pageColumn}>
                    <div className={Styles.toolsPanel}>
                        <InputSelect
                            options={['Featured', 'Newest', 'Most Liked']}
                            defaultOption="Featured"
                            onChange={newVal => console.log(newVal)}
                        />
                        <button
                            className={Styles.postIdea}
                            onClick={() => navigate('/post-idea')}
                        >
                            {'Post your idea'}
                        </button>
                    </div>
                    <div className={Styles.ideaListWrapper}>
                        {/* <IdeaPanelAccordion idea={dummyIdea} /> */}
                        {dummyIdeas.map((idea, i) => (
                            <IdeaPanelAccordion
                                idea={idea}
                                key={`${idea.heading}-${i}`}
                            />
                        ))}
                    </div>
                    <Pagination
                        totalPages={10}
                        onPageChange={newPage =>
                            console.log('newPage', newPage)
                        }
                    />
                </div>
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
        </PrimarySection>
    );
};

export default IdeaPanel;
