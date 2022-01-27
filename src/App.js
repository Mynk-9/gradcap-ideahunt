import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import IdeaPanel from './pages/ideapanel/IdeaPanel';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<></>} />
                <Route path="/idea-panel" element={<IdeaPanel />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
