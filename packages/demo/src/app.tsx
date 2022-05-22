import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import {Gallery} from './gallery';
import {Terminal} from './terminal';

function App() {
    const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Gallery/>}/>
                <Route path="/terminal/" element={<Terminal/>}/>
            </Routes>
        </Router>
    );
}

export default App;
