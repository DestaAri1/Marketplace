import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AdminRoute, AuthRoute } from './utils/AuthRoute';
import Home from './pages/Home/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import UserRequest from './pages/Dashboard/User/User/UserRequest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path='/register' element={<AuthRoute><Register/></AuthRoute>}/>

        {/* Main Page */}
        <Route path='/' element={<Home/>}/>

        {/* Admin/Seller Page */}
        <Route path='/dashboard' element={<AdminRoute><Dashboard/></AdminRoute>}/>
        <Route path='/dashboard/user_request' element={<AdminRoute><UserRequest/></AdminRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
