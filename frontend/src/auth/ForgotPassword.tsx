import { API_BASE_URL } from "../config/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/navigate";
import { useState } from "react";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type ForgotFormData = z.infer<typeof forgotSchema>;

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/userlogin/reset-password/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ADD THIS LINE
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("resetEmail", data.email);
        navigate("/reset-password-otp");
      } else {
        setError(result.message || "Failed to send OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
          <div className="relative h-64 overflow-hidden lg:h-auto">
            <img
              src="/image/login_auth_car.png"
              alt="Forgot Password"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 text-white bg-emerald-950/75 backdrop-blur-sm w-full p-5 rounded-l-xl">
              <h1 className="text-2xl lg:text-4xl font-bold font-heading">
                Forgot Password?
              </h1>
              <p className="text-sm lg:text-lg max-w-sm text-emerald-100 mt-1">
                Enter your email to receive a 6-digit verification code.
              </p>
            </div>
          </div>
          <div className="flex flex-col p-6 sm:p-10 lg:p-12 justify-center space-y-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h1 className="text-3xl font-bold font-heading text-slate-900">Enter Your Email</h1>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-0 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold shadow-md shadow-emerald-600/20 disabled:opacity-50 transition"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
