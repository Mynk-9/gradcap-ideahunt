import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import BodyContainer from './components/bodycontainer/BodyContainer';
import SideNav from './components/sidenav/SideNav';
import IdeaPanel from './pages/ideapanel/IdeaPanel';
import Home from './pages/home/Home';
import PostIdea from './pages/postidea/PostIdea';
import Profile from './pages/profile/Profile';

import SidenavContext from './contexts/SidenavContext';

import 'normalize.css';
import './App.scss';

import HomeIconInactive from './assets/icons/home-inactive.svg';
import HomeIconActive from './assets/icons/home-active.svg';
import IdeaPanelIconInactive from './assets/icons/message-square-inactive.svg';
import IdeaPanelIconActive from './assets/icons/message-square-active.svg';
import RewardsIconInactive from './assets/icons/award-inactive.svg';
import RewardsIconActive from './assets/icons/award-active.svg';

const App = () => {
    const [sidenavActive, setSidenavActive] = useState(false);

    useEffect(() => {
        const rootFontSize = 15;
        let baseWidth = 1920;
        const windowWidth = document.documentElement.clientWidth;
        if (windowWidth < 768) baseWidth = 375;
        const ratio = windowWidth / baseWidth;
        const fontSize = rootFontSize * ratio;
        document.styleSheets[0].insertRule(`:root { font-size: ${fontSize}px}`);
    }, []);

    return (
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
                        {
                            text: 'Rewards',
                            iconInactive: RewardsIconInactive,
                            iconActive: RewardsIconActive,
                            path: '/rewards',
                            checkPaths: [/\/rewards/g],
                        },
                        {
                            text: 'Contact Us',
                            mobileOnly: true,
                            path: 'contact-us',
                            checkPaths: [/\/contact-us/g],
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
                    <Route path="/idea/panel" element={<IdeaPanel />} />
                    <Route
                        path="/idea"
                        element={<Navigate replace to={'/idea/panel'} />}
                    />
                    <Route path="/post-idea" element={<PostIdea />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <SideNav buttons={[]} mobileVisible={false} pcVisible={true} />
            </BodyContainer>
            <Footer />
        </SidenavContext.Provider>
    );
};

export default App;
