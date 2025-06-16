import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Label } from "@/components/shadcn/label";
import { NotebookPen } from "lucide-react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        setError("email", {
          type: "manual",
          message: message,
        });
      } else if (message === "Password is incorrect") {
        setError("password", {
          type: "manual",
          message: message,
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFF1ED",
      }}
    >
      <Card className="w-full max-w-sm">
        <div className="flex flex-row items-center justify-center gap-1 pt-6">
          <NotebookPen
            className="w-10 h-10 mb-2"
            style={{ color: "#FFB5A7" }}
          />
          <h1
            className="text-2xl font-semibold text-center"
            style={{ color: "#FFB5A7" }}
          >
            Notes Vault
          </h1>
        </div>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
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
                        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6 px-0">
              <Button
                type="submit"
                className="w-full"
                disabled={isButtonLoading}
              >
                {isButtonLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-#ffffff" />
                ) : (
                  "Login"
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
