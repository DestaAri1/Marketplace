import React from 'react'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">Registration</h2>
            <form className="space-y-6">
                <div>
                    <Input
                        label={"Username"}
                        type={"username"}
                        placeholder={"Enter your username"}
                        name={"username"} 
                        onChange={"/"}
                        value={""}
                    />
                </div>
                <div>
                    <Input
                        label={"Email"}
                        type={"email"}
                        placeholder={"Enter your email"}
                        name={"email"} 
                        onChange={"/"}
                        value={""}
                    />
                </div>
                <div>
                    <Input
                        label={"Password"}
                        type={"password"}
                        placeholder={"Enter your password"}
                        name={"password"}
                    />
                </div>
                <Button classes={'bg-indigo-600 hover:bg-indigo-700'} type={'submit'} name={'Register'}></Button>
            </form>
            <p className="text-sm text-center text-gray-600">
                Don't have an account? <Link to={"/login"}  className="text-indigo-500">Login</Link>
            </p>
        </div>
    </div>
  )
}
