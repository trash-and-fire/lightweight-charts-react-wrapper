import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Gallery} from './gallery';
import {Terminal} from './terminal';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Gallery/>}/>
                <Route path="/terminal/" element={<Terminal/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
