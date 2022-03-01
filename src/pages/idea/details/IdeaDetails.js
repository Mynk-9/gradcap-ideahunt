import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IdeaPanelAccordion from '../../../components/ideapanelaccordion/IdeaPanelAccordion';
import Heading from './../../../components/heading/Heading';
import CommentSection from './../../../components/commentsection/CommentSection';
import RedLink from './../../../components/redlink/RedLink';
import ProfileImage from '../../../components/profileimage/ProfileImage';

import Styles from '../Idea.module.scss';

import LikeIcon from './../../../assets/icons/heart.svg';
import LikedIcon from './../../../assets/icons/heart-filled.svg';
import CommentIcon from './../../../assets/icons/message-square.svg';
import ShareIcon from './../../../assets/icons/share.svg';
import axios from 'axios';
import PostCommentDialog from '../../../components/postcommentdialog/PostCommentDialog';

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
    const [exploreMoreIdeas, setExploreMoreIdeas] = useState(null);

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

    const fetchExplore = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER}ideas/explore`)
            .then(resp => {
                if (resp.status === 200) {
                    setExploreMoreIdeas(resp.data.ideas);
                } else console.log('Error at fetching explore.');
            })
            .catch(err => {
                console.log('Error at fetching explore.', err);
            });
    };

    useEffect(() => {
        ideaId = getIdeaId(location.pathname);

        fetchIdea();
        fetchComments();
        fetchExplore();
        if (token) fetchLiked();
    }, [location]);

    const likeIdea = () => {
        if (!token) {
            alert('Please login to like idea.');
            return;
        }

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
                {exploreMoreIdeas ? (
                    exploreMoreIdeas
                        .filter(_idea => _idea.ideaId != ideaId)
                        .slice(0, 3)
                        .map(_idea => (
                            <IdeaPanelAccordion
                                idea={_idea}
                                key={_idea.ideaId}
                                featured={_idea.featured}
                            />
                        ))
                ) : (
                    <></>
                )}
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
