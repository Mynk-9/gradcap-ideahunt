import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PrimarySection from './../../components/primarysection/PrimarySection';
import Heading from './../../components/heading/Heading';
import RedButton from './../../components/redbutton/RedButton';
import RedLink from './../../components/redlink/RedLink';

import LoginContext from './../../contexts/LoginContext';

import Styles from './PostIdea.module.scss';

import PenIcon from './../../assets/icons/pen.svg';

const PostIdea = () => {
    const navigate = useNavigate();
    const { loginData } = useContext(LoginContext);
    const loggedIn = localStorage.getItem('g-token') ? true : false;

    // redirect back if not logged in
    useEffect(() => {
        if (!loggedIn) navigate('/login', { replace: true });
    });

    const [ideaName, setIdeaName] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [ideaDesc, setIdeaDesc] = useState('');
    const [descValid, setDescValid] = useState(true);

    const nameSizeLimit = 50;
    const descSizeLimit = 100;

    const handleIdeaNameChange = e => {
        const name = e.target.value;
        setIdeaName(name);
        if (name.length > nameSizeLimit) setNameValid(false);
        else setNameValid(true);
    };

    const handleIdeaDescChange = e => {
        const desc = e.target.value;
        setIdeaDesc(desc);
        if (desc.length > descSizeLimit) setDescValid(false);
        else setDescValid(true);
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('g-token');
        axios
            .post(
                `${process.env.REACT_APP_SERVER}ideas`,
                {
                    heading: ideaName,
                    details: ideaDesc,
                    userId: loginData.userId,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(resp => {
                if (resp.status !== 201)
                    throw new Error(
                        `Error at post creation. ${resp.data.error}`
                    );
                alert('Post created.');
                setIdeaDesc('');
                setIdeaName('');
            })
            .catch(err => {
                alert('Error');
                console.log(err);
                if (err.response.status === 403) {
                    localStorage.removeItem('g-token');
                    alert('Session expired, please login again.');
                    navigate('/login');
                }
            });
    };

    return (
        <PrimarySection>
            <Heading>{'Post your idea'}</Heading>
            <div className={Styles.form}>
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
                        placeholder={`Describe your idea in max. ${descSizeLimit} characters`}
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
                        onClick={() => {
                            if (nameValid === true && descValid === true)
                                handleSubmit();
                            else alert('Please enter valid data.');
                        }}
                        classNames={[Styles.postButton]}
                    />
                </div>
            </div>
            <RedLink
                text={'Go to Idea Panel'}
                link={'/idea/panel'}
                styles={{ paddingBottom: '4rem' }}
            />
        </PrimarySection>
    );
};

export default PostIdea;
