import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import PostCommentDialog from './../../components/postcommentdialog/PostCommentDialog';

import Styles from './CommentSection.module.scss';

import LikeIcon from './../../assets/icons/heart.svg';
import LikedIcon from './../../assets/icons/heart-filled.svg';

const timeDifference = (today, otherDay) => {
    let difference = today - otherDay;

    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    if (daysDifference > 0) return `${daysDifference}d`;

    let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;
    if (hoursDifference > 0) return `${hoursDifference}h`;

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;
    if (minutesDifference > 0) return `${minutesDifference}m`;

    let secondsDifference = Math.floor(difference / 1000);
    if (secondsDifference > 0) return `${secondsDifference}s`;
};

const Comment = ({ comment, ideaId }) => {
    if (typeof comment !== 'object') return <></>;

    const [children, setChildren] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.likes);
    const [replyDialog, openReplyDialog] = useState(false);

    const token = localStorage.getItem('g-token');

    useEffect(() => {
        if (!token) return;

        axios
            .get(
                `${process.env.REACT_APP_SERVER}ideas/comments/${comment.commentId}/like`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(resp => {
                setLiked(resp.data?.liked ? true : false);
            })
            .catch(err => console.log(err));
    }, []);

    const likeComment = commentId => {
        axios
            .post(
                `${process.env.REACT_APP_SERVER}ideas/comments/${commentId}/like`,
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
                if (resp.status !== 201) console.log('Error in liking comment');
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

    const fetchChildCommentData = commentId => {
        axios
            .get(
                `${process.env.REACT_APP_SERVER}ideas/comments/${commentId}/children`
            )
            .then(resp => {
                if (resp.status === 200) {
                    setChildren(resp.data);
                } else console.log('Error at fetching idea child comments.');
            })
            .catch(err => {
                console.log('Error at fetching idea child comments.', err);
            });
    };

    const handleReply = reply => {
        axios
            .post(
                `${process.env.REACT_APP_SERVER}ideas/comments/`,
                { data: reply, parentComment: comment.commentId },
                {
                    headers: { authorization: token },
                    params: { ideaId: ideaId },
                }
            )
            .then(resp => {
                if (resp.status === 201) {
                    fetchChildCommentData(comment.commentId);
                } else console.log('Error at fetching idea child comments.');
            })
            .catch(err => {
                console.log('Error at fetching idea child comments.', err);
            });
    };

    return (
        <div className={Styles.commentWrapper}>
            <div className={Styles.comment}>
                <div className={Styles.profile}>
                    <img src={comment.user.profileURL} />
                </div>
                <div className={Styles.body}>
                    <div className={Styles.main}>
                        <span className={Styles.person}>
                            {comment.user.name}
                        </span>
                        <span className={Styles.text}>{comment.data}</span>
                    </div>
                    <div className={Styles.stats}>
                        <span>
                            {timeDifference(
                                new Date().getTime(),
                                comment.postTime
                            )}
                        </span>
                        <span>{`${likeCount} likes`}</span>
                        <button
                            onClick={() => {
                                if (token) openReplyDialog(true);
                                else alert('Login to post reply.');
                            }}
                        >{`Reply`}</button>
                        <PostCommentDialog
                            open={replyDialog}
                            handleClose={() => openReplyDialog(false)}
                            handleComment={handleReply}
                        />
                        {comment.childComments.length > 0 ? (
                            !children ? (
                                <button
                                    onClick={() =>
                                        fetchChildCommentData(comment.commentId)
                                    }
                                >
                                    {'Show replies'}
                                </button>
                            ) : (
                                <button onClick={() => setChildren(null)}>
                                    {'Hide replies'}
                                </button>
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className={Styles.interactions}>
                    <img
                        onClick={() => likeComment(comment.commentId)}
                        src={liked ? LikedIcon : LikeIcon}
                        style={liked ? { filter: 'none' } : {}}
                    />
                </div>
            </div>
            {children ? (
                <div className={Styles.replies}>
                    {children.map(childComment => (
                        <Comment
                            key={childComment.commentId}
                            comment={childComment}
                            ideaId={ideaId}
                        />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

const CommentSection = ({ comments, ideaId }) => {
    return (
        <div className={Styles.commentSection}>
            {comments.map(comment => (
                <Comment
                    key={comment.commentId}
                    comment={comment}
                    ideaId={ideaId}
                />
            ))}
        </div>
    );
};

const commentProp = propTypes.shape({
    commentId: propTypes.string.isRequired,
    user: propTypes.shape({
        name: propTypes.string.isRequired,
        profileURL: propTypes.string,
    }),
    data: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    postTime: propTypes.string.isRequired,
    parentComment: propTypes.string,
    childComments: propTypes.any,
});

Comment.propTypes = {
    comment: commentProp,
    ideaId: propTypes.string.isRequired,
};

CommentSection.propTypes = {
    comments: propTypes.arrayOf(commentProp).isRequired,
    ideaId: propTypes.string.isRequired,
};

export default CommentSection;
