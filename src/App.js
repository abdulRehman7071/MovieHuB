
// import './App.css';
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UploadMovie from './pages/UploadMovie';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MovieDetails from './pages/MovieDetails';
import { createContext, useState } from 'react';

const AppState = createContext()
function App() {
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('')
  return (
    <AppState.Provider value={{ login, setLogin, user, setUser }}>
      <div className=' bg-gray-900'>

        <Header />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/upload-movie' element={<UploadMovie />} />
          <Route path='/view-movie/:id' element={<MovieDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState }