import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import BodyContainer from './components/bodycontainer/BodyContainer';
import SideNav from './components/sidenav/SideNav';
import IdeaPanel from './pages/ideapanel/IdeaPanel';

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
        const rootFontSize = 16;
        let baseWidth = 1920;
        if (window.innerWidth < 768) baseWidth = 375;
        const ratio = window.innerWidth / baseWidth;
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
                        },
                        {
                            text: 'Idea Panel',
                            iconInactive: IdeaPanelIconInactive,
                            iconActive: IdeaPanelIconActive,
                            path: '/idea-panel',
                        },
                        {
                            text: 'Rewards',
                            iconInactive: RewardsIconInactive,
                            iconActive: RewardsIconActive,
                            path: '/rewards',
                        },
                        {
                            text: 'Contact Us',
                            mobileOnly: true,
                            path: 'contact-us',
                        },
                    ]}
                    mobileVisible={true}
                    pcVisible={true}
                />
                <Routes>
                    <Route exact path="/" element={<></>} />
                    <Route path="/idea-panel" element={<IdeaPanel />} />
                </Routes>
                <SideNav buttons={[]} mobileVisible={false} pcVisible={true} />
            </BodyContainer>
            <Footer />
        </SidenavContext.Provider>
    );
};

export default App;
