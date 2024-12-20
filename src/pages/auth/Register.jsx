import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Confirm Password does not match!");
      return;
    }

    try {
      await axios.post("https://wokshop1.vercel.app/api/register", {
        email: data.email,
        password: data.password,
      });
      toast.success("Registration Successful!");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    }
  };

  const calculateStrength = (password) => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length > 5) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {/* Password Strength Bar */}
            <div className="flex mt-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <span
                  key={index}
                  className={`flex-1 h-2 mx-1 rounded ${
                    index < strength
                      ? index === 3
                        ? "bg-green-500"
                        : index === 2
                        ? "bg-yellow-500"
                        : "bg-red-500"
                      : "bg-gray-200"
                  }`}
                ></span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {strength === 0
                ? "ใส่รหรัสผ่าน"
                : strength < 4
                ? "Password strength: Medium"
                : "Password strength: Strong"}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              type="password"
              {...register("confirmpassword", {
                required: "Confirm Password is required",
              })}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Confirm your password"
            />
            {errors.confirmpassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition-all"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:text-green-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
