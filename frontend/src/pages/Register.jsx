import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Label } from "@/components/shadcn/label";
import { NotebookPen, UserPlus } from "lucide-react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerVector from "@/assets/login_vector.jpg"; // use register_vector.svg if you have it

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      setIsButtonLoading(true);
      const response = await axios.post("/api/users", data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.data.createdUser.name,
          email: response.data.data.createdUser.email,
        })
      );
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response.data.message || "User Registration Failed";
      if (errorMessage === "User already registered with this Email") {
        setError("email", { type: "manual", message: errorMessage });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Illustration */}
      <div className="lg:w-1/2 w-full bg-primary text-white flex items-center justify-center px-10 py-10">
        <img
          src={registerVector}
          alt="Register Illustration"
          className="max-w-md w-full"
        />
      </div>

      {/* Right Register Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center px-8 sm:px-14 py-10 bg-white">
        <div className="flex items-center gap-2 mb-8">
          <NotebookPen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Notes Vault</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-1 text-zinc-800">
          Create an Account
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Enter your details to get started.
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-zinc-700">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              {...register("name", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must have at least 3 characters",
                },
              })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="password" className="text-zinc-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Must include 8+ chars, uppercase, lowercase, number & symbol",
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
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </>
              )}
            </Button>
          </div>

          {/* Login link */}
          <p className="text-sm text-zinc-500 text-center pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
