import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import BodyContainer from './components/bodycontainer/BodyContainer';
import SideNav from './components/sidenav/SideNav';
import Home from './pages/home/Home';
import PostIdea from './pages/postidea/PostIdea';
import Profile from './pages/profile/Profile';
import Idea from './pages/idea/Idea';
import IdeaPanel from './pages/idea/panel/IdeaPanel';
import IdeaDetails from './pages/idea/details/IdeaDetails';
import LoginPage from './pages/loginpage/LoginPage';

import SidenavContext from './contexts/SidenavContext';
import LoginContext from './contexts/LoginContext';

import 'normalize.css';
import './App.scss';

import HomeIconInactive from './assets/icons/home-inactive.svg';
import HomeIconActive from './assets/icons/home-active.svg';
import IdeaPanelIconInactive from './assets/icons/message-square-inactive.svg';
import IdeaPanelIconActive from './assets/icons/message-square-active.svg';
// import RewardsIconInactive from './assets/icons/award-inactive.svg';
// import RewardsIconActive from './assets/icons/award-active.svg';
import ContactUs from './pages/contactus/ContactUs';

const App = () => {
    const [sidenavActive, setSidenavActive] = useState(false);
    const [loginData, setLoginData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('g-token');
        if (!token) return;
        if (token && loginData) return;

        console.log('Doing token verification.');

        axios
            .post(
                `${process.env.REACT_APP_SERVER}login/google/verify`,
                {},
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(resp => {
                setLoginData({
                    token: token,
                    ...resp.data,
                });
                console.log('Token verified');
            })
            .catch(() => {
                localStorage.removeItem('g-token');
                console.log('Token expired, require re-login');
                navigate('/home', { replace: true });
            });
    }, []);

    useEffect(() => {
        const rootFontSize = 15;
        let baseWidth = 1920;
        const windowWidth = document.documentElement.clientWidth;
        if (windowWidth < 768) baseWidth = 375;
        const ratio = windowWidth / baseWidth;
        const fontSize = rootFontSize * ratio;
        try {
            document.styleSheets[0].insertRule(
                `:root { font-size: ${fontSize}px}`
            );
        } catch (e) {
            setTimeout(
                () =>
                    document.styleSheets[0].insertRule(
                        `:root { font-size: ${fontSize}px}`
                    ),
                2000
            );
        }
    }, []);

    return (
        <LoginContext.Provider
            value={{
                loginData: loginData,
                setLoginData: setLoginData,
            }}
        >
            <SidenavContext.Provider
                value={{
                    active: sidenavActive,
                    setActive: setSidenavActive,
                }}
            >
                <Navbar />
                <BodyContainer>
                    <SideNav
                        buttons={[
                            {
                                text: 'Home',
                                iconInactive: HomeIconInactive,
                                iconActive: HomeIconActive,
                                path: '/home',
                                checkPaths: [/\/home/g],
                            },
                            {
                                text: 'Idea Panel',
                                iconInactive: IdeaPanelIconInactive,
                                iconActive: IdeaPanelIconActive,
                                path: '/idea/panel',
                                checkPaths: [/\/idea\/*/g, /\/post-idea/g],
                            },
                            // {
                            //     text: 'Rewards',
                            //     iconInactive: RewardsIconInactive,
                            //     iconActive: RewardsIconActive,
                            //     path: '/rewards',
                            //     checkPaths: [/\/rewards/g],
                            // },
                            {
                                text: 'Contact Us',
                                mobileOnly: true,
                                path: 'contact-us',
                                checkPaths: [/\/contact-us/g],
                            },
                            {
                                text: 'Login',
                                mobileOnly: true,
                                path: 'login',
                                checkPaths: [/\/login/g],
                            },
                        ]}
                        mobileVisible={true}
                        pcVisible={true}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to={'/home'} />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route path="/idea" element={<Idea />}>
                            <Route
                                index
                                element={<Navigate replace to={'panel'} />}
                            />
                            <Route path="panel" element={<IdeaPanel />} />
                            <Route path=":ideaId" element={<IdeaDetails />} />
                        </Route>
                        <Route path="/post-idea" element={<PostIdea />} />
                        <Route path="/profile">
                            <Route index element={<Profile />} />
                            <Route path=":userId" element={<Profile />} />
                        </Route>
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route
                            path="/login"
                            element={
                                <>
                                    <Home />
                                    <LoginPage />
                                </>
                            }
                        />
                    </Routes>
                    <SideNav
                        buttons={[]}
                        mobileVisible={false}
                        pcVisible={true}
                    />
                </BodyContainer>
                <Footer />
            </SidenavContext.Provider>
        </LoginContext.Provider>
    );
};

export default App;
