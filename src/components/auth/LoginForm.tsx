import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import type { LoginRequest } from "../../types/auth";
import RegisterForm from "./RegisterForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

const LoginForm: React.FC = () => {
  const { login } = useAuthContext();
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(credentials);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof LoginRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">💰</div>
          <h1 className="text-2xl font-bold text-blue-600">BudgetFlow</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            value={credentials.username}
            onChange={handleInputChange("username")}
            placeholder="Enter your username"
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange("password")}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={
              isLoading || !credentials.username || !credentials.password
            }
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 mb-1">Demo Credentials:</p>
          <p className="text-xs text-blue-600">
            Username: demo | Password: password
          </p>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowRegister(true)}
            className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
            disabled={isLoading}
          >
            Don't have an account? Sign up
          </button>
        </div>

        {/* Forgot Password */}
        <div className="mt-2 text-center">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-xs transition-colors"
            disabled={isLoading}
            onClick={() => alert("Password reset feature coming soon!")}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
