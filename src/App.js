import { Routes, Route } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import BodyContainer from './components/bodycontainer/BodyContainer';
import SideNav from './components/sidenav/SideNav';
import IdeaPanel from './pages/ideapanel/IdeaPanel';

import './App.scss';

import HomeIcon from './assets/images/home.svg';
import IdeaPanelIcon from './assets/images/message-square.svg';
import RewardsIcon from './assets/images/award.svg';

const App = () => {
    return (
        <>
            <Navbar />
            <BodyContainer>
                <SideNav
                    buttons={[
                        {
                            text: 'Home',
                            icon: HomeIcon,
                            path: '/home',
                        },
                        {
                            text: 'Idea Panel',
                            icon: IdeaPanelIcon,
                            path: '/idea-panel',
                        },
                        {
                            text: 'Rewards',
                            icon: RewardsIcon,
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
