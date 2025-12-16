
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react';

import RetrievePage from './pages/RetrievePage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';

import './index.css';

function App() {

  const [exerciseToUpdate, setExerciseToUpdate] = useState();

  return (
    <div className="app">
      <header>
        <h1>Workout Log</h1>
        <p>Keep Track of Your Workouts</p>
      </header>
        <Router>
          <nav className = "App-nav">
            <Link to="/">Home</Link>
            <Link to='/create'>Create</Link>
          </nav>
          <main>
            <Routes>
              <Route path='/' element={<RetrievePage setExerciseToUpdate={setExerciseToUpdate}></RetrievePage>}></Route>
              <Route path='/create' element={<CreatePage></CreatePage>}></Route>
              <Route path='/update' element={<UpdatePage exerciseToUpdate={exerciseToUpdate}></UpdatePage>}></Route>
            </Routes>
          </main>
        </Router>
        <footer>
          <p>&#xA9; 2025 Cortez, Cristo</p>
        </footer>
    </div>
  );
}

export default App;