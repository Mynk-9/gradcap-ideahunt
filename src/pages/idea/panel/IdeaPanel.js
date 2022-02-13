import { useNavigate } from 'react-router-dom';

import IdeaPanelAccordion from '../../../components/ideapanelaccordion/IdeaPanelAccordion';
import Pagination from '../../../components/pagination/Pagination';

import Styles from '../Idea.module.scss';

import UserIcon from './../../../assets/icons/user-profile.svg';
import InputSelect from './../../../components/inputselect/InputSelect';

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
                onPageChange={newPage => console.log('newPage', newPage)}
            />
        </div>
    );
};

export default IdeaPanel;
