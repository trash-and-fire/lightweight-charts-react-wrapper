import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Gallery} from './gallery';
import {Terminal} from './terminal';

function App() {
    return (
        <BrowserRouter basename="/lightweight-charts-react-wrapper/">
            <Routes>
                <Route path="/" element={<Gallery/>}/>
                <Route path="/terminal/" element={<Terminal/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
