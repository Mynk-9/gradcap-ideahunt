import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IdeaPanelAccordion from '../../../components/ideapanelaccordion/IdeaPanelAccordion';
import Heading from './../../../components/heading/Heading';
import CommentSection from './../../../components/commentsection/CommentSection';
import RedLink from './../../../components/redlink/RedLink';
import ProfileImage from '../../../components/profileimage/ProfileImage';

import Styles from '../Idea.module.scss';

import UserIcon from './../../../assets/icons/user-profile.svg';
import LikeIcon from './../../../assets/icons/heart.svg';
import LikedIcon from './../../../assets/icons/heart-filled.svg';
import CommentIcon from './../../../assets/icons/message-square.svg';
import ShareIcon from './../../../assets/icons/share.svg';
import axios from 'axios';
import PostCommentDialog from '../../../components/postcommentdialog/PostCommentDialog';

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

const getIdeaId = path => {
    path = path.split('/');
    let id = path.pop();
    while (id === '/') id = path.pop();
    return id;
};

const IdeaDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [idea, setIdea] = useState(null);
    const [comments, setComments] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentDialog, openCommentDialog] = useState(false);

    const token = localStorage.getItem('g-token');
    let ideaId = getIdeaId(location.pathname);

    const fetchComments = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER}ideas/comments/`, {
                params: { ideaId: ideaId },
            })
            .then(resp => {
                if (resp.status === 200) {
                    setComments(resp.data);
                } else console.log('Error at fetching idea comments.');
            })
            .catch(err => {
                console.log('Error at fetching idea comments.', err);
            });
    };

    const fetchIdea = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER}ideas/${ideaId}`)
            .then(resp => {
                if (resp.status === 200) {
                    setIdea(resp.data);
                    setLikeCount(resp.data.likes);
                } else console.log('Error at fetching idea.');
            })
            .catch(err => {
                console.log('Error at fetching idea.', err);
            });
    };

    const fetchLiked = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER}ideas/${ideaId}/like`, {
                headers: {
                    authorization: token,
                },
            })
            .then(resp => {
                setLiked(resp.data?.liked ? true : false);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        ideaId = getIdeaId(location.pathname);

        fetchIdea();
        fetchComments();
        if (token) fetchLiked();
    }, [location]);

    const likeIdea = () => {
        axios
            .post(
                `${process.env.REACT_APP_SERVER}ideas/${ideaId}/like`,
                {
                    like: !liked,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(resp => {
                if (resp.status !== 201) console.log('Error in liking idea');
                else {
                    if (resp.data.likeStatus) setLikeCount(val => val + 1);
                    else setLikeCount(val => val - 1);
                    setLiked(val => !val);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleComment = reply => {
        axios
            .post(
                `${process.env.REACT_APP_SERVER}ideas/comments/`,
                { data: reply },
                {
                    headers: { authorization: token },
                    params: { ideaId: ideaId },
                }
            )
            .then(resp => {
                if (resp.status === 201) {
                    fetchComments();
                } else console.log('Error at fetching idea child comments.');
            })
            .catch(err => {
                console.log('Error at fetching idea child comments.', err);
            });
    };

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
                    <ProfileImage
                        src={idea?.profile?.photo}
                        userId={idea?.profile?.userId}
                    />
                    <span className={Styles.header}>{idea?.profile?.name}</span>
                </div>
                <div className={Styles.idea}>
                    <div className={Styles.header}>{idea?.heading}</div>
                    <div className={Styles.details}>{idea?.details}</div>
                </div>
                <div className={Styles.stats}>
                    {`Liked by `}
                    <span className={Styles.stat}>{`${likeCount} users`}</span>
                </div>
                <div className={Styles.interactions}>
                    <img
                        src={liked ? LikedIcon : LikeIcon}
                        style={liked ? { filter: 'none' } : {}}
                        onClick={likeIdea}
                    />
                    <img
                        src={CommentIcon}
                        onClick={() => openCommentDialog(true)}
                    />
                    <PostCommentDialog
                        handleClose={() => {
                            openCommentDialog(false);
                        }}
                        open={commentDialog}
                        handleComment={handleComment}
                    />
                    <img src={ShareIcon} />
                </div>
                {idea && comments ? (
                    <CommentSection comments={comments} ideaId={idea.ideaId} />
                ) : (
                    <></>
                )}
            </div>
            <Heading>{'Explore more Ideas'}</Heading>
            <div className={Styles.ideaListWrapper}>
                {dummyIdeas.map((_idea, i) => (
                    <IdeaPanelAccordion
                        idea={_idea}
                        key={`${_idea.heading}-${i}`}
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
