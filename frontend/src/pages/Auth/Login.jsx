import React, { useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { showErrorToast } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import Button from "../../components/Button";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      var response = await login(formData.email, formData.password);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if there's a redirect URL in sessionStorage
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
      if (redirectUrl) {
        sessionStorage.removeItem("redirectAfterLogin"); // Clear the stored URL
        navigate(redirectUrl);
      } else {
        navigate("/", {
          state: { message: response.data.message || "Login Success!" },
        });
      }
    } catch (err) {
      showErrorToast(err.message || "Failed to log in");
    } finally {
      setLoading(false);
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
          <Button
            type={"submit"}
            classes={"bg-blue-500 hover:bg-blue-700"}
            disabled={loading}
            name={loading ? <LoadingSpinner /> : "Login"}
          />
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-indigo-500">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
