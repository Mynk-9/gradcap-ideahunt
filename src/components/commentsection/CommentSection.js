import propTypes from 'prop-types';

import Styles from './CommentSection.module.scss';

import LikeIcon from './../../assets/icons/heart.svg';

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
    return (
        <div className={Styles.commentWrapper}>
            <div className={Styles.comment}>
                <div className={Styles.profile}>
                    <img src={comment.poster.photo} />
                </div>
                <div className={Styles.body}>
                    <div className={Styles.main}>
                        <span className={Styles.person}>
                            {comment.poster.name}
                        </span>
                        <span className={Styles.text}>{comment.comment}</span>
                    </div>
                    <div className={Styles.stats}>
                        <span>
                            {timeDifference(
                                new Date().getTime(),
                                comment.postTime
                            )}
                        </span>
                        <span>{`${comment.likes} likes`}</span>
                        <button>{`Reply`}</button>
                    </div>
                </div>
                <div className={Styles.interactions}>
                    <img src={LikeIcon} />
                </div>
            </div>
            {comment.comments.length > 0 ? (
                <div className={Styles.replies}>
                    {comment.comments.map((comment, i) => (
                        <Comment
                            key={`${i}-${ideaId}`}
                            comment={comment}
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
            {comments.map((comment, i) => (
                <Comment
                    key={`${i}-${ideaId}`}
                    comment={comment}
                    ideaId={ideaId}
                />
            ))}
        </div>
    );
};

const commentProp = propTypes.shape({
    poster: propTypes.shape({
        name: propTypes.string.isRequired,
        photo: propTypes.string,
    }),
    comment: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    liked: propTypes.bool.isRequired,
    postTime: propTypes.number.isRequired,
    comments: propTypes.any,
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
