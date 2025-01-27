import React, { useState } from 'react'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import { showErrorToast } from '../../utils/Toast';
import { ToastContainer } from 'react-toastify';
import Button from '../../components/Button';

export default function Register() {
        const [formData, setFormData] = useState({username: '', email: '', password: '' });
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();
        const { register } = useAuth();
    
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          try {       
            var response = await register(formData.username, formData.email, formData.password);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate('/', { state: { message: response.data.message || 'Login success!' }});
          } catch (err) {
            showErrorToast(err.message || "Failed to log in");
          } finally {
            setLoading(false)
          }
        };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">Registration</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <Input
                        label={"Username"}
                        type={"text"}
                        placeholder={"Enter your username"}
                        name={"username"} 
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>
                <div>
                    <Input
                        label={"Email"}
                        type={"email"}
                        placeholder={"Enter your email"}
                        name={"email"} 
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>
                <div>
                    <Input
                        label={"Password"}
                        type={"password"}
                        placeholder={"Enter your password"}
                        name={"password"}
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <Button type={'submit'} classes={'bg-blue-500 hover:bg-blue-700'} disabled={loading}
                  name={loading ? (<LoadingSpinner/>) : (
                    'Register'
                  )}
                />
            </form>
            <p className="text-sm text-center text-gray-600">
                Don't have an account? <Link to={"/login"}  className="text-indigo-500">Login</Link>
            </p>
        </div>
    </div>
  )
}
