import { useState } from 'react';
import propTypes from 'prop-types';

import Styles from './IdeaPanelAccordion.module.scss';

import CommentIcon from './../../assets/icons/message-square.svg';
import LikeIcon from './../../assets/icons/heart.svg';
import ShareIcon from './../../assets/icons/share.svg';
import DetailsIcon from './../../assets/icons/chevron-right.svg';

const IdeaPanelAccordion = ({ idea }) => {
    const [active, setActive] = useState(false);

    return (
        <div className={Styles.accordion} active={active ? 'true' : 'false'}>
            <div className={Styles.details}>
                <div className={Styles.ideaDetails}>{idea.details}</div>
                <span className={Styles.viewIdea}>View Data</span>
            </div>
            <div className={Styles.panel}>
                <div className={Styles.panelSection}>
                    <div
                        className={`${Styles.panelItem} ${Styles.profileItem}`}
                    >
                        <img src={idea.profile} alt="Profile image" />
                    </div>
                    <div className={Styles.panelItem}>
                        <span className={Styles.brief}>{idea.heading}</span>
                    </div>
                </div>
                <div className={Styles.panelSection}>
                    <div className={Styles.panelItem}>
                        <img src={LikeIcon} alt="Like" />
                        <span className={Styles.stats}>{'56'}</span>
                    </div>
                    <div className={Styles.panelItem}>
                        <img src={CommentIcon} alt="Comment" />
                        <span className={Styles.stats}>{'4'}</span>
                    </div>
                    <div className={Styles.panelItem}>
                        <img src={ShareIcon} alt="Share" />
                    </div>
                    <div className={Styles.panelItem}>
                        <img
                            className={Styles.expandButton}
                            src={DetailsIcon}
                            alt="Details"
                            onClick={() => setActive(prev => !prev)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

IdeaPanelAccordion.propTypes = {
    idea: propTypes.shape({
        profile: propTypes.string.isRequired,
        heading: propTypes.string.isRequired,
        likes: propTypes.number,
        comments: propTypes.number,
        details: propTypes.string,
    }),
};

export default IdeaPanelAccordion;
