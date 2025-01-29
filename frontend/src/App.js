import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthRoute } from './utils/AuthRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path='/register' element={<Register/>}/>

        {/* Main Page */}
        <Route path='/' element={<Home/>}/>

        {/* Admin/Seller Page */}
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
