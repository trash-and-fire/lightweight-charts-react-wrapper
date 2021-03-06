import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Gallery} from './gallery';
import {Terminal} from './terminal/terminal';

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Gallery/>}/>
                <Route path="/terminal/" element={<Terminal/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
