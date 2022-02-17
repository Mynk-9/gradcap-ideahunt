import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../../components/heading/Heading';
import Login from '../../components/login/Login';

import Styles from './LoginPage.module.scss';

const LoginPage = () => {
    const boxRef = useRef(null);
    const navigate = useNavigate();

    const handleExit = e => {
        const box = boxRef.current.getBoundingClientRect();

        if (
            e.clientX < box.left ||
            e.clientX > box.right ||
            e.clientY < box.top ||
            e.clientY > box.bottom
        )
            navigate(-1);
    };

    return (
        <div className={Styles.wrapper} onClick={handleExit}>
            <div className={Styles.box} ref={boxRef}>
                <Heading>
                    <span style={{ color: 'white' }}>
                        {'Login with Google'}
                    </span>
                </Heading>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;
