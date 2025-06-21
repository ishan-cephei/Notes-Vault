import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Label } from "@/components/shadcn/label";
import { NotebookPen, LockKeyhole } from "lucide-react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginVector from "@/assets/login_vector.jpg"; // ✅ adjust path if needed

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      setIsButtonLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        data
      );
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.data.loggedInUser.name,
          email: response.data.data.loggedInUser.email,
        })
      );
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      if (message === "User does not exist") {
        setError("email", { type: "manual", message });
      } else if (message === "Password is incorrect") {
        setError("password", { type: "manual", message });
      } else {
        toast.error(message);
      }
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Side - Illustration */}
      <div className="lg:w-1/2 w-full bg-primary text-white flex items-center justify-center px-10 py-10">
        <img
          src={loginVector}
          alt="Login Illustration"
          className="max-w-md w-full"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center px-8 sm:px-14 py-10 bg-white">
        <div className="flex items-center gap-2 mb-8">
          <NotebookPen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Notes Vault</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-1 text-zinc-800">
          Welcome Back
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Login to access your notes securely.
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-zinc-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-zinc-700">
                Password
              </Label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Must contain 8+ characters, uppercase, lowercase, number, and symbol",
                },
              })}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-primary transition-all"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <>
                  <LockKeyhole className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </div>

          {/* Register link */}
          <p className="text-sm text-zinc-500 text-center pt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
