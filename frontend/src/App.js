import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {
  AdminRoute,
  AuthRoute,
  NestedProtectedRoute,
  ProtectedRoute,
  SellerRoute,
} from "./utils/AuthRoute";
import Home from "./pages/Home/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import UserRequest from "./pages/Dashboard/User/User/UserRequest";
import UserList from "./pages/Dashboard/User/User/UserList";
import DashboardSeller from "./pages/Seller/Dashboard/DashboardSeller";
import SellerProducts from "./pages/Seller/Product/SellerProducts";
import ManageCategory from "./pages/Dashboard/Product/ManageCategory";
import DetailProduct from "./pages/Home/Product/DetailProduct";
import CheckOut from "./pages/Home/CheckOut/CheckOut";
import Profile from "./pages/Home/Profile/Profile";
import Address from "./pages/Home/Profile/Address";

export default function App() {
  const authRoutes = [
    { path: "/login", element: <Login />, wrapper: AuthRoute },
    { path: "/register", element: <Register />, wrapper: AuthRoute },
  ];

  const sellerRoutes = [
    {
      path: "/seller/dashboard",
      element: <DashboardSeller />,
      wrapper: SellerRoute,
    },
    {
      path: "/seller/products",
      element: <SellerProducts />,
      wrapper: SellerRoute,
    },
  ];

  const adminRoutes = [
    { path: "/admin/dashboard", element: <Dashboard />, wrapper: AdminRoute },
    {
      path: "/admin/user_request",
      element: <UserRequest />,
      wrapper: AdminRoute,
    },
    { path: "/admin/user-list", element: <UserList />, wrapper: AdminRoute },
    {
      path: "/admin/manage-category",
      element: <ManageCategory />,
      wrapper: AdminRoute,
    },
  ];

  const renderRoute = ({ path, element, wrapper: Wrapper }) => (
    <Route
      key={path}
      path={path}
      element={Wrapper ? <Wrapper>{element}</Wrapper> : element}
    />
  );

  return (
    <BrowserRouter>
      <Routes>
        {authRoutes.map(renderRoute)}
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <DetailProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-out"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<NestedProtectedRoute />}>
          <Route index element={<Profile />} />
          <Route path="biodata" element={<Profile />} />
          <Route path="address" element={<Address />} />
        </Route>
        {sellerRoutes.map(renderRoute)}
        {adminRoutes.map(renderRoute)}
      </Routes>
    </BrowserRouter>
  );
}
