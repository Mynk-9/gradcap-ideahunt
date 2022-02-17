import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { GoogleLogin } from 'react-google-login';

import LoginContext from '../../contexts/LoginContext';
import { refreshTokenSetup } from '../../utilities/refreshGOAuthToken';

const Login = () => {
    const { setLoginData } = useContext(LoginContext);
    const navigate = useNavigate();

    const responseGoogle = (googleResp, refreshCallback) => {
        axios
            .post('http://localhost:8050/login/google', {
                access_token: googleResp.tokenObj.access_token,
                email: googleResp.profileObj.email,
                expires_at: googleResp.tokenObj.expires_at,
            })
            .then(resp => {
                let status = resp.data.ok;
                if (status) {
                    console.log('Logged in');
                    setLoginData({ ...resp.data.user });
                    localStorage.setItem('g-token', resp.data.token);
                    if (!refreshCallback) {
                        refreshTokenSetup(
                            googleResp,
                            responseGoogle,
                            resp.data.user.email
                        );
                        navigate('/home');
                    }
                }
            });
    };

    return (
        <>
            <GoogleLogin
                clientId={process.env.REACT_APP_OAUTH_CLIENT}
                onSuccess={responseGoogle}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
        </>
    );
};

export default Login;
