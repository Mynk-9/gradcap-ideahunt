import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<></>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
