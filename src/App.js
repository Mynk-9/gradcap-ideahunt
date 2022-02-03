import { Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import BodyContainer from './components/bodycontainer/BodyContainer';
import SideNav from './components/sidenav/SideNav';
import IdeaPanel from './pages/ideapanel/IdeaPanel';

import './App.scss';

import HomeIconInactive from './assets/icons/home-inactive.svg';
import HomeIconActive from './assets/icons/home-active.svg';
import IdeaPanelIconInactive from './assets/icons/message-square-inactive.svg';
import IdeaPanelIconActive from './assets/icons/message-square-active.svg';
import RewardsIconInactive from './assets/icons/award-inactive.svg';
import RewardsIconActive from './assets/icons/award-active.svg';

const App = () => {
    return (
        <>
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
                    ]}
                />
                <Routes>
                    <Route exact path="/" element={<></>} />
                    <Route path="/idea-panel" element={<IdeaPanel />} />
                </Routes>
                <SideNav buttons={[]} />
            </BodyContainer>
            <Footer />
        </>
    );
};

export default App;
