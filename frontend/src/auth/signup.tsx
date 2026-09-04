import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BackButton from "../component/navigate";
import { signupSchema } from "../lib/validation";
import api from "../lib/api";

export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // local validation with zod
    const result = signupSchema.safeParse({
      fullname: form.fullname,
      email: form.email,
      password: form.password,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const resp = await api.post("/user/register", {
        username: form.fullname,
        email: form.email,
        password: form.password,
        role: "user",
      });

      console.log("Signup success response:", resp);

      // ✅ Store email temporarily
      sessionStorage.setItem("signupEmail", form.email);

      // ✅ Navigate without email in URL
      navigate("/verify-otp");
    } catch (err: unknown) {
      console.error("Signup error (full):", err);

      let serverMsg: string | null = null;
      let status: number | undefined;
      let networkMsg: string | undefined;

      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as {
          response?: {
            data?: { message?: string; error?: string } | string;
            status?: number;
          };
          message?: string;
        };

        const data = axiosErr.response?.data;
        status = axiosErr.response?.status;
        networkMsg = axiosErr.message;

        if (typeof data === "string") {
          serverMsg = data;
        } else {
          serverMsg = data?.message || data?.error || null;
        }
      } else if (err instanceof Error) {
        networkMsg = err.message;
      }

      if (serverMsg) {
        setError(`Server: ${serverMsg} ${status ? `(status ${status})` : ""}`);
      } else if (networkMsg) {
        setError(networkMsg);
      } else {
        setError("Something went wrong");
      }

      setLoading(false);
    }
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden border border-slate-100">
          {/* Left Image */}
          <div className="relative overflow-hidden h-64 lg:h-auto">
            <img
              src="/image/signup_auth_car.png"
              alt="RentGo Signup"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 w-full text-white bg-emerald-950/75 backdrop-blur-sm p-5 rounded-l-xl">
              <h1 className="text-2xl lg:text-4xl font-bold font-heading">Join RentGo</h1>
              <p className="text-sm lg:text-lg max-w-sm text-emerald-100 mt-1">
                Create your account to book vehicles quickly and easily.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-12 space-y-5 justify-center bg-white">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Create an Account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullname"
                placeholder="Username"
                value={form.fullname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold transition shadow-md shadow-emerald-600/20 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:underline font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
