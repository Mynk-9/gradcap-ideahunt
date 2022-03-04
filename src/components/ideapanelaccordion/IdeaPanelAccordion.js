import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';

import ProfileImage from '../profileimage/ProfileImage';

import Styles from './IdeaPanelAccordion.module.scss';

import CommentIcon from './../../assets/icons/message-square.svg';
import CommentIconActive from './../../assets/icons/message-square-outline-active.svg';
import LikeIcon from './../../assets/icons/heart.svg';
import LikedIcon from './../../assets/icons/heart-filled.svg';
import ShareIcon from './../../assets/icons/share.svg';
import DetailsIcon from './../../assets/icons/chevron-right.svg';

const IdeaPanelAccordion = ({ idea, featured }) => {
    const [active, setActive] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(idea.likes);
    const navigate = useNavigate();

    const token = localStorage.getItem('g-token');
    const commentCount = parseInt(idea.comments);
    const ideaDetailPage = `/idea/${idea.ideaId}`;

    useEffect(() => {
        if (!token) return;

        axios
            .get(`${process.env.REACT_APP_SERVER}ideas/${idea.ideaId}/like`, {
                headers: {
                    authorization: token,
                },
            })
            .then(resp => {
                setLiked(resp.data?.liked ? true : false);
            })
            .catch(err => console.log(err));
    }, []);

    const toggleOpen = e => {
        e.stopPropagation();
        setActive(isActive => !isActive);
    };

    const likeIdea = e => {
        e.stopPropagation();
        if (!token) {
            alert('Please login to like idea.');
            return;
        }

        axios
            .post(
                `${process.env.REACT_APP_SERVER}ideas/${idea.ideaId}/like`,
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
                    setLikeCount(resp.data?.likes >= 0 ? resp.data.likes : 0);
                    setLiked(val => !val);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div
            className={Styles.accordion}
            active={active ? 'true' : 'false'}
            data-featured={featured ? 'true' : 'false'}
        >
            <div className={Styles.details}>
                <div className={Styles.ideaDetails}>{idea.details}</div>
                <span className={Styles.viewIdea}>
                    <Link to={ideaDetailPage}>{'View Idea'}</Link>
                </span>
            </div>
            <div className={Styles.panel} onClick={toggleOpen}>
                <div className={Styles.panelSection}>
                    <div
                        className={`${Styles.panelItem} ${Styles.profileItem}`}
                    >
                        <ProfileImage
                            src={idea.profile.photo}
                            userId={idea.profile.userId}
                        />
                    </div>
                    <div className={Styles.panelItem}>
                        <span className={Styles.brief}>{idea.heading}</span>
                    </div>
                </div>
                <div className={Styles.panelSection}>
                    <div className={Styles.panelItem} onClick={likeIdea}>
                        <img
                            src={liked ? LikedIcon : LikeIcon}
                            alt="Like"
                            style={liked ? { filter: 'none' } : {}}
                        />
                        <span className={Styles.stats}>{likeCount}</span>
                    </div>
                    <div
                        className={Styles.panelItem}
                        onClick={e => {
                            e.preventDefault();
                            navigate(ideaDetailPage);
                        }}
                    >
                        <img
                            src={
                                commentCount > 0
                                    ? CommentIconActive
                                    : CommentIcon
                            }
                            alt="Comment"
                            data-filter={commentCount === 0}
                        />
                        <span className={Styles.stats}>{commentCount}</span>
                    </div>
                    <div
                        className={Styles.panelItem}
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <img src={ShareIcon} alt="Share" />
                        <span className={Styles.stats}>{'Share'}</span>
                    </div>
                    <div className={Styles.panelItem} onClick={toggleOpen}>
                        <img
                            className={Styles.expandButton}
                            src={DetailsIcon}
                            alt="Details"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

IdeaPanelAccordion.propTypes = {
    idea: propTypes.shape({
        profile: propTypes.shape({
            name: propTypes.string,
            photo: propTypes.string,
            userId: propTypes.string,
        }).isRequired,
        heading: propTypes.string.isRequired,
        likes: propTypes.number,
        comments: propTypes.number,
        details: propTypes.string,
        ideaId: propTypes.string.isRequired,
    }),
    featured: propTypes.bool,
};

export default IdeaPanelAccordion;
