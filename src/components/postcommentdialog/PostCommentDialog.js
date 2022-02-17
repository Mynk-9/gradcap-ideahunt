import { useRef, useState } from 'react';
import propTypes from 'prop-types';

import Styles from './PostCommentDialog.module.scss';

import MessageIcon from './../../assets/icons/message-square-active.svg';
import CloseIcon from './../../assets/icons/close.svg';

const PostCommentDialog = ({ handleComment, handleClose, open }) => {
    if (!open) return <></>;

    const boxRef = useRef(null);
    const [reply, setReply] = useState('');

    const handleDialogExit = e => {
        const { clientX: mouseX, clientY: mouseY } = e;
        const { left, right, top, bottom } =
            boxRef.current.getBoundingClientRect();

        if (mouseX < left || right < mouseX || mouseY < top || bottom < mouseY)
            handleClose();
    };

    return (
        <div className={Styles.dialog} onClick={handleDialogExit}>
            <div className={Styles.box} ref={boxRef}>
                <div className={Styles.row}>
                    <img src={CloseIcon} onClick={handleClose} />
                </div>
                <div className={Styles.row}>
                    <img src={MessageIcon} />
                    <input
                        type="text"
                        placeholder="Comment"
                        value={reply ? reply : ''}
                        onChange={e => setReply(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            handleComment(reply);
                            handleClose();
                        }}
                    >
                        {'Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};
PostCommentDialog.propTypes = {
    handleComment: propTypes.func.isRequired,
    handleClose: propTypes.func.isRequired,
    open: propTypes.bool.isRequired,
};

export default PostCommentDialog;
