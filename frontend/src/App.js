import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AdminRoute, AuthRoute, SellerRoute } from './utils/AuthRoute';
import Home from './pages/Home/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import UserRequest from './pages/Dashboard/User/User/UserRequest';
import UserList from './pages/Dashboard/User/User/UserList';
import DashboardSeller from './pages/Seller/Dashboard/DashboardSeller';
import SellerArchive from './pages/Seller/Product/SellerArchive';
import SellerProducts from './pages/Seller/Product/SellerProducts';
import ManageCategory from './pages/Dashboard/Product/ManageCategory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path='/register' element={<AuthRoute><Register/></AuthRoute>}/>

        {/* Main Page */}
        <Route path='/' element={<Home/>}/>

        {/* Seller Page */}
        <Route path='/seller/dashboard' element={<SellerRoute><DashboardSeller/></SellerRoute>}/>
        <Route path='/seller/archive-product' element={<SellerRoute><SellerArchive/></SellerRoute>}/>
        <Route path='/seller/products' element={<SellerRoute><SellerProducts/></SellerRoute>}/>

        {/* Admin/Seller Page */}
        <Route path='/dashboard' element={<AdminRoute><Dashboard/></AdminRoute>}/>
        <Route path='/dashboard/user_request' element={<AdminRoute><UserRequest/></AdminRoute>}/>
        <Route path='/dashboard/user-list' element={<AdminRoute><UserList/></AdminRoute>}/>
        <Route path='/dashboard/manage-category' element={<AdminRoute><ManageCategory/></AdminRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
