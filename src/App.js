
// import './App.css';
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <div className=' bg-gray-900'>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/upload-movie' element={<AddMovie />} />
        <Route path='/view-movie/:id' element={<MovieDetails />} />
      </Routes>
    </div>

  );
}

export default App;
