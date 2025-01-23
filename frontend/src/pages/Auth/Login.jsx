import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    //   setLoading(true);
      try {       
        await login(formData.email, formData.password);
        
        // navigate('/', { state: { message: 'Login success! Welcome back my lord.' }});
      } catch (err) {
        // showErrorToast(err.message || "Failed to log in");
      } finally {
        // setLoading(false);
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                <Button classes={'bg-indigo-600 hover:bg-indigo-700'} type={'submit'} name={'Login'}></Button>
            </form>
            <p className="text-sm text-center text-gray-600">
                Don't have an account? <Link to={'/register'} className="text-indigo-500">Register</Link>
            </p>
        </div>
    </div>
  )
}
