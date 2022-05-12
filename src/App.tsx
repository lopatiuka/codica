import './App.scss';
import { CitiesComponent } from './features/city/Cities';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Details } from './features/city/Details';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={ <CitiesComponent/> }/>
          <Route path="details/:name" element={ <Details/> }/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
