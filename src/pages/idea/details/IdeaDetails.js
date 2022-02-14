import { useNavigate } from 'react-router-dom';

import IdeaPanelAccordion from '../../../components/ideapanelaccordion/IdeaPanelAccordion';
import Heading from './../../../components/heading/Heading';
import CommentSection from './../../../components/commentsection/CommentSection';
import RedLink from './../../../components/redlink/RedLink';

import Styles from '../Idea.module.scss';

import UserIcon from './../../../assets/icons/user-profile.svg';
import LikeIcon from './../../../assets/icons/heart.svg';
import CommentIcon from './../../../assets/icons/message-square.svg';
import ShareIcon from './../../../assets/icons/share.svg';

const dummyIdea = {
    ideaId: 'abc',
    profile: { name: 'Prateek Behera', photo: UserIcon },
    heading: 'Consumable plastic for saving the environment',
    details:
        'This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this.' +
        'This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this.',
    likes: 50,
    comments: 8,
    postedComments: [
        {
            poster: { name: 'Abhishek Sethi', photo: UserIcon },
            comment:
                'I think this idea is amazing and could be used for packaging',
            likes: 5,
            liked: false,
            postTime: new Date().getTime() - 36000000,
            comments: [
                {
                    poster: { name: 'Mayank Singh', photo: UserIcon },
                    comment:
                        'I think this idea is amazing and could be used for packaging',
                    likes: 5,
                    liked: false,
                    postTime: new Date().getTime() - 36000000,
                    comments: [],
                },
                {
                    poster: { name: 'Mayank Singh', photo: UserIcon },
                    comment: '@PrateekBehera What do you think?',
                    likes: 5,
                    liked: false,
                    postTime: new Date().getTime() - 36000000,
                    comments: [
                        {
                            poster: { name: 'Mayank Singh', photo: UserIcon },
                            comment: '@PrateekBehera What do you think?',
                            likes: 5,
                            liked: false,
                            postTime: new Date().getTime() - 36000000,
                            comments: [],
                        },
                    ],
                },
            ],
        },
        {
            poster: { name: 'Simran Handa', photo: UserIcon },
            comment: 'What if we use corn starch for this?',
            likes: 5,
            liked: false,
            postTime: new Date().getTime() - 36000000,
            comments: [],
        },
    ],
};

const dummyIdeas = [dummyIdea, dummyIdea, dummyIdea];

const IdeaDetails = () => {
    let navigate = useNavigate();

    return (
        <div className={Styles.pageColumn}>
            <div className={Styles.toolsPanel}>
                <div />
                <button
                    className={Styles.postIdea}
                    onClick={() => navigate('/post-idea')}
                >
                    {'Post your idea'}
                </button>
            </div>
            <div className={Styles.ideaDetails}>
                <div className={Styles.user}>
                    <img src={dummyIdea.profile.photo} />
                    <span className={Styles.header}>
                        {dummyIdea.profile.name}
                    </span>
                </div>
                <div className={Styles.idea}>
                    <div className={Styles.header}>{dummyIdea.heading}</div>
                    <div className={Styles.details}>{dummyIdea.details}</div>
                </div>
                <div className={Styles.stats}>
                    {`Liked by `}
                    <span
                        className={Styles.stat}
                    >{`${dummyIdea.likes} users`}</span>
                </div>
                <div className={Styles.interactions}>
                    <img src={LikeIcon} />
                    <img src={CommentIcon} />
                    <img src={ShareIcon} />
                </div>
                <CommentSection
                    comments={dummyIdea.postedComments}
                    ideaId={dummyIdea.ideaId}
                />
            </div>
            <Heading>{'Explore more Ideas'}</Heading>
            <div className={Styles.ideaListWrapper}>
                {dummyIdeas.map((idea, i) => (
                    <IdeaPanelAccordion
                        idea={idea}
                        key={`${idea.heading}-${i}`}
                    />
                ))}
            </div>
            <RedLink
                text={'Back'}
                onClick={() => navigate(-1)}
                // styles={{ fontSize: '1.875rem' }}
            />
        </div>
    );
};

export default IdeaDetails;
