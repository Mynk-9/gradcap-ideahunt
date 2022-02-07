import { useState } from 'react';

import PrimarySection from './../../components/primarysection/PrimarySection';
import Heading from './../../components/heading/Heading';
import RedButton from './../../components/redbutton/RedButton';
import RedLink from './../../components/redlink/RedLink';

import Styles from './PostIdea.module.scss';

import PenIcon from './../../assets/icons/pen.svg';

const PostIdea = () => {
    const [ideaName, setIdeaName] = useState('');
    const [nameValid, setNameValid] = useState('true');
    const [ideaDesc, setIdeaDesc] = useState('');
    const [descValid, setDescValid] = useState('true');

    const nameSizeLimit = 50;
    const descSizeLimit = 500;

    const handleIdeaNameChange = e => {
        const name = e.target.value;
        setIdeaName(name);
        if (name.length > nameSizeLimit) setNameValid('false');
        else setNameValid('true');
    };

    const handleIdeaDescChange = e => {
        const desc = e.target.value;
        setIdeaDesc(desc);
        if (desc.length > descSizeLimit) setDescValid('false');
        else setDescValid('true');
    };

    return (
        <PrimarySection>
            <Heading>{'Post your idea'}</Heading>
            <form className={Styles.form}>
                <div className={Styles.ideaNameWrapper} data-valid={nameValid}>
                    <input
                        type={'text'}
                        className={Styles.ideaName}
                        placeholder={`Name of your idea`}
                        value={ideaName}
                        onChange={handleIdeaNameChange}
                    />
                    <img src={PenIcon} className={Styles.ideaNameIcon} />
                </div>
                <span className={Styles.warning} data-valid={nameValid}>
                    {`Name should be within ${nameSizeLimit} characters`}
                </span>
                <div className={Styles.ideaDescWrapper} data-valid={descValid}>
                    <textarea
                        className={Styles.ideaDesc}
                        placeholder={`Describe your idea in max. ${descSizeLimit} words`}
                        value={ideaDesc}
                        onChange={handleIdeaDescChange}
                    />
                </div>
                <span className={Styles.warning} data-valid={descValid}>
                    {`Description should be within ${descSizeLimit} characters`}
                </span>
                <div style={{ textAlign: 'center' }}>
                    <RedButton
                        text={'Post'}
                        onClick={() => ({})}
                        classNames={[Styles.postButton]}
                    />
                </div>
            </form>
            <RedLink
                text={'Go to Idea Panel'}
                link={'/idea-panel'}
                styles={{ paddingBottom: '4rem' }}
            />
        </PrimarySection>
    );
};

export default PostIdea;
