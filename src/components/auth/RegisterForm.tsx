import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RegisterRequest } from "../../types/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { VALIDATION } from "../../utils/constants";

interface RegisterFormProps {
  onBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onBack }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<
    RegisterRequest & { confirmPassword: string }
  >({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
      setError(
        `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`
      );
      setIsLoading(false);
      return;
    }

    if (formData.username.length < VALIDATION.USERNAME.MIN_LENGTH) {
      setError(
        `Username must be at least ${VALIDATION.USERNAME.MIN_LENGTH} characters`
      );
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center">
            <div className="text-4xl mb-4 text-green-500">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully. You can now sign in
              with your credentials.
            </p>
            <Button variant="primary" onClick={onBack} className="w-full">
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">💰</div>
          <h1 className="text-2xl font-bold text-blue-600">BudgetFlow</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            value={formData.username}
            onChange={handleInputChange("username")}
            placeholder="Choose a username"
            required
            disabled={isLoading}
            helperText={`Minimum ${VALIDATION.USERNAME.MIN_LENGTH} characters`}
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Create a password"
            required
            disabled={isLoading}
            helperText={`Minimum ${VALIDATION.PASSWORD.MIN_LENGTH} characters`}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />

          {/* Security Question Section */}
          <div className="border-t pt-4 mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Security Question (Optional)
            </h3>

            <Input
              label="Security Question"
              type="text"
              value={formData.securityQuestion || ""}
              onChange={handleInputChange("securityQuestion")}
              placeholder="e.g., What was your first pet's name?"
              disabled={isLoading}
              helperText="This will help you reset your password if needed"
            />

            {formData.securityQuestion && (
              <Input
                label="Answer"
                type="text"
                value={formData.securityAnswer || ""}
                onChange={handleInputChange("securityAnswer")}
                placeholder="Enter your answer"
                disabled={isLoading}
              />
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={
              isLoading ||
              !formData.username ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
            disabled={isLoading}
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
